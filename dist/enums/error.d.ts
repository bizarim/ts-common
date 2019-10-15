/**
 * 에러코드 정의
 */
export declare enum eErrorCode {
    Success = 0,
    Undefined = 1,
    AskAdmin = 100,
    BadRequest = 400,
    NotFound = 404,
    API = 500,
    /**
     * 등록 되지 않은 provider 입니다.
     */
    InvalidProviderCode = 501,
    /**
     * 제공된 provider key가 잘못 됬습니다. 메일을 확인해 주세요.
     */
    InvalidProviderKey = 502,
    InvalidTokenAccess = 503,
    InvalidTokenRefresh = 504,
    ExpireTokenAccess = 505,
    AlreadyExistProvider = 506,
    InvalidRequest = 507,
    InvalidMemberId = 508,
    DoNotReqeustWallet = 510,
    AlreadyRequestWallet = 511,
    AlreadyExistWallet = 512,
    CannotUseCoinWallet = 513,
    NotEnoughBalance = 514,
    NotEnoughMotherLedger = 515,
    UnmanagedAddress = 516,
    UnmanagedProvider = 517,
    NoneExistProviderAccount = 600,
    NoneExistProviderWallet = 601,
    NoneExistMember = 602,
    NoneExistCoinWallet = 603,
    NoneExistCoinBalance = 604,
    NoneExistTransaction = 605,
    NoneExistBlock = 606,
    /**
     * RPC 통신 오류
     * todo 세분화
     */
    RPC = 800,
    DB = 900,
    DB_ERROR = 901,
    DB_ERROR_ISR_AffectedRows = 902,
    DB_ERROR_UP_AffectedRows = 903,
    DB_ERROR_UP_ChangedRows = 904,
    DB_ERROR_CONN = 905,
    REDIS = 950,
    REDIS_ERROR = 951,
    REDIS_EXCEPTION = 952,
    REDIS_CONN_ERROR = 953,
    REDIS_HKEY_NONE_VALUES = 954,
    REDIS_KEY_NONE_VALUE = 955
}