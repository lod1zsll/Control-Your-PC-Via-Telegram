interface IMysqlDataSuccess<T> {
    success: true,
    data?: T
}

interface IMysqlDataFailed {
    success: false,
    error: string
}
export type TMysqlData<Y> = IMysqlDataSuccess<Y> | IMysqlDataFailed;