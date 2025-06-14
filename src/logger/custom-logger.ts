import { Logger, QueryRunner } from 'typeorm';

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log('[SQL]', query, parameters);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.error('[SQL ERROR]', error, query, parameters);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.warn('[SLOW QUERY]', time, query, parameters);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log('[SCHEMA]', message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log('[MIGRATION]', message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    console.log(`[${level.toUpperCase()}]`, message);
  }
}
