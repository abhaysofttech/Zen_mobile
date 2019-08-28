export class Constants{
  public static ENVIRONMENT = 'Stage'
  // public static ENVIRONMENT = 'Prod'
  public static NO_INTERNET_ALERT_TILE: string =  'No Internet Connection';
  public static NO_INTERNET_ALERT_SUB_TILE: string = 'You are offline please check your internet connection';
  public static ERROR_TITLE = 'Error'
  public static ERROR_MESSAGE = "Server not responding, please try after some time."
  public static LOCAL_DB_NAME = "zenforte_db"
  // Set app session timeout limit in multiple of minutes
  public static SESSION_TIMEOUT_LIMIT = 1 * 1000 * 60;
}