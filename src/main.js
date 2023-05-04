const {
    app,
    BrowserWindow,
    dialog
} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    // 创建窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        minimizable: false,
    })

    // 加载页面
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // 不生效
    win.on('minimize', (event) => {
        // 阻止窗口最小化的默认行为
        event.preventDefault()
    })

    // 当窗口关闭时，阻止默认行为，提示用户是否真的要关闭
    win.on('close', (event) => {
        event.preventDefault()
        const choice = dialog.showMessageBoxSync(win, {
            type: 'question',
            buttons: ['哼，就关', '我点错了'],
            defaultId: 0,
            message: '亲爱的不要关闭页面啊',
            title: 'OoO'
        })
        if (choice === 0) {
            // win = null
            // app.quit()
            dialog.showMessageBoxSync({
                type: 'info',
                title: '略略略',
                message: '你关不掉哦',
                detail: '说喜欢我才能关哦'
            })
        }
    })
}

// 程序初始化完成后创建窗口
app.on('ready', createWindow)

// 所有窗口关闭时退出程序
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 重新打开程序时创建窗口
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})