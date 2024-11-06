import { Injectable } from '@angular/core';
import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ListTablesCommand, PutItemCommand, ScanCommand, ScanCommandInput, UpdateItemCommand  } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { awsConfig, awsTables } from '../app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService';


@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private dynamoDB: DynamoDBClient = new DynamoDBClient;

  constructor(private auth : AuthService, private http : HttpClient) {
    this.initializeDynamoDBClient();
  }

  async initializeDynamoDBClient() {
    const tokens = await this.auth.getCurrentSession();

    const idToken = tokens?.idToken?.toString();

    let COGNITO_ID = awsConfig.CognitoId; // 'COGNITO_ID' has the format 'cognito-idp.REGION.amazonaws.com/COGNITO_USER_POOL_ID'
    let loginData = {
      [COGNITO_ID]: idToken!
    };

    if (tokens?.idToken) {
      this.dynamoDB = new DynamoDBClient({
        region: awsConfig.userCognito.region,
        credentials: fromCognitoIdentityPool({
          clientConfig: awsConfig.userCognito.clientConfig,
          identityPoolId: awsConfig.userCognito.identityPoolId, // Substitua pelo seu ID do pool de identidade
          logins: loginData
        })
      });

    } else {
      console.error('Tokens de autenticação não disponíveis.');
    }
  }

  async getAllItens(table: keyof typeof awsTables.tabelas){
    await this.initializeDynamoDBClient();

    const params = {
      TableName: awsTables.tabelas[table]
    };

    try {
      const items = [];
      let data;
      const command = new ScanCommand(params);
      data = await this.dynamoDB.send(command);

      // Adiciona os itens retornados na lista de itens
      if (data.Items) {
          items.push(...data.Items.map((item: any) => unmarshall(item)));
      }

      return items;

  } catch (error) {
      console.error('Erro ao buscar todos os itens:', error);
      throw error; // Repassa o erro para ser tratado externamente, se necessário
  }
  }

  readAllItens(urlApiTabela: keyof typeof awsTables.urlApiTabelas): Observable<any[]>{
    return this.http.get<any[]>(awsTables.urlApiTabelas[urlApiTabela]);
  }

  // Método para criar um item no DynamoDB
  async createItem(item: any, table: keyof typeof awsTables.tabelas): Promise<void> {

    await this.initializeDynamoDBClient();

    let temp = await this.getAllItens(table);

    temp.forEach(element => {

      if (item.id == element[awsTables.camposTabela.id]) {
        console.log('Item já existe.');
        return;
      }

    });

    const params = {
      TableName: awsTables.tabelas[table],
      Item: marshall(item), // Converte o item para o formato esperado pelo DynamoDB
    };

    try {
      const command = new PutItemCommand(params);
      await this.dynamoDB.send(command);
      console.log('Item criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  }

  async getItem(key: any, table: keyof typeof awsTables.tabelas) {

    await this.initializeDynamoDBClient();

    // Definir os parâmetros da consulta
    const params = {
        TableName: awsTables.tabelas[table],
        Key: marshall({id: key})
    };

    try {
        // Criar e enviar o comando
        const command = new GetItemCommand(params);
        const data = await this.dynamoDB.send(command);

        // Retornar o item deserializado ou null
        return data.Item ? unmarshall(data.Item) : null;
    } catch (error) {
        console.error('Erro ao obter item:', error);
        return null; // Retorna null em caso de erro
    }
  }

  async updateItem(item: any, table: keyof typeof awsTables.tabelas): Promise<any> {
    try {
      const command = new UpdateItemCommand({
        TableName: awsTables.tabelas[table], // Substitua pelo nome da sua tabela
        Key: marshall({
          id: item.id // A chave primária do item a ser atualizado
        }),
        UpdateExpression: 'set titulo = :titulo, #d = :data, descricao = :descricao, link_Imgs = :link_Imgs',
        ExpressionAttributeNames: {
          '#d': 'data' // Placeholder para a palavra-chave reservada
        },
        ExpressionAttributeValues: marshall({
          ':titulo': item.titulo,
          ':data': item.data,
          ':descricao': item.descricao,
          ':link_Imgs': item.link_Imgs // Se link_Imgs for um array, ajuste conforme necessário
        }),
        ReturnValues: 'UPDATED_NEW' // Para retornar os novos valores atualizados
      });

      return this.dynamoDB.send(command);
      } catch (error) {
          console.error('Erro ao obter item:', error);
      }
  }

  async deleteItem(item: any, table: keyof typeof awsTables.tabelas): Promise<any> {
    try {
      const command = new DeleteItemCommand({
        TableName: awsTables.tabelas[table], // Substitua pelo nome da sua tabela
        Key: marshall({
          id: item.id // A chave primária do item a ser deletado
        }),
        // ReturnValues: 'ALL_OLD' // Para retornar os valores antigos antes da deleção, se necessário
      });

      const result = await this.dynamoDB.send(command);
      console.log('Item deletado com sucesso:', result);
      return result; // Retorna o resultado da operação de deleção
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      throw error; // Rejoga o erro para tratamento posterior, se necessário
    }
  }
}
