
// 菜单栏生成
var menusdata =  [
    
    // {
    //     id: '0',
    //     path: '/filemange',
    //     meta: { title: '文件管理', icon: 'dashboard' },
    //     children: [
    //         {
    //             path: '/filemange/subfile?id=0',
    //             meta: { title: 'Menu1-1' }
    //         },
    //         {
    //             path: '/filemange/subfile',
    //             meta: { title: 'Menu1-2' },
    //             children: [
    //                 {
    //                     path: '/filemange/subfile?id=1',
    //                     meta: { title: 'Menu1-2-1' }
    //                 },
    //                 {
    //                     path: '/filemange/subfile',
    //                     meta: { title: 'Menu1-2-2' }
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        id: '0',
        path: '/homepage',
        meta: { title: '首页', icon: 'dashboard' }
    },
    
    {
        id: '1',
        path: '/filemange/index',
        class: 'file',
        meta: { title: '文件管理', icon: 'el-icon-s-help' },
        children:[]
    },
    {
        id: '2',
        path: '/usermange/index',
        meta: { title: '用户管理', icon: 'form' }
       
    },
    {
        id: '3',
        path: '/systme',
        meta: { title: '系统管理', icon: 'dashboard' },
        children: [
            {
                id:'3-1',
                path: 'changepass',
                meta: { title: '修改密码', icon: 'table' }
            },
            {
                id: '3-2',
                path: 'userrelated',
                meta: { title: '用户相关', icon: 'tree' }
            },
            {
                id: '3-3',
                path: 'switchtheme',
                meta: { title: '皮肤更换', icon: 'tree' }
            }
        ]
    }
    // {
    //     id: '4',
    //     path: '/',
    //     meta: { title: '前端展示页面', icon: 'link' }

    // }
]

export default menusdata