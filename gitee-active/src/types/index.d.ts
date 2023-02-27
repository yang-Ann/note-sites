// 日期
type timeObjType = Partial<{
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
  SSS: string;
  DDD: string;
}>;

// 用户信息
type defineConfigType = {
  user: string;
  password: string;
  loginUrl: string;
  repositoryPagesUrl: string;
};


// logger 相关配置
type defineDirnameInfoType = {
  loggerDir: string;
  imgErrDir: string;
  errTrackPath: string;
  operPath: string;
};