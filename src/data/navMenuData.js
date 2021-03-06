const data = [
    {
        name: '入网配置',
        icon: 'database',
        key: 'internet',
        children: [
            // {   
            //     name: '设备激活',
            //     key: '/internet/activation'
            // },
            {   
                name: '网络配置',
                key: '/internet/deploy'
            },
            
        ]
    },
    {
        name: '设备配置',
        icon: 'hdd',
        key: 'devicedeploy',
        children: [
            {
                name: '人脸网关管理',
                key: '/devicedeploy/face'
            },
            {
                name: '摄像头管理',
                key: '/devicedeploy/carmera'
            },
            // {
            //     name: '网络继电器管理',
            //     key: '/devicedeploy/relay'
            // },
        ]
    },
    {
        name: '功能管理',
        icon: 'setting',
        key: 'function',
        children: [
            // {
            //     name: '位置信息',
            //     key: '/function/position'
            // },
            {
                name: '人脸库信息',
                key: '/function/faceInfo'
            },
            {
                name: '通道设置',
                key: '/function/wayInfo'
            },
            {
                name: '以图搜图',
                key: '/function/faceList'
            }
        ]
    },
    {
        name: '工程操作',
        icon: 'exception',
        key: 'project',
        children: [
            {
                name: '工程测试',
                key: '/project/projectTest'
            },
            {
                name: '感知系统',
                key: '/project/esthesis'
            },
            {
                name: '布控系统',
                key: '/project/arrange'
            },
            {
                name: '系统参数详情',
                key: '/project/qr-code'
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'laptop',
        key: 'system',
        children: [
            // {
            //     name: '系统操作',
            //     key: '/system/system'
            // },
            {
                name: '抓拍日志',
                key: '/system/captureLog'
            },
            {
                name: '通行日记',
                key: '/system/passLog'
            },
            {
                name: '操作日记',
                key: '/system/operateLog'
            },
            {
                name: '监控',
                key: '/system/monitor'
            },
            {
                name: '存储',
                key: '/system/storage'
            }
        ]
    },
]

export default data