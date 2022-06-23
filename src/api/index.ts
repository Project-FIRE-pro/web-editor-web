export const delay = (sec: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve(); // 正確完成的回傳方法
        }, sec * 1000);
    });
}