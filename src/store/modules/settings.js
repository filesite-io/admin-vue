import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,

//   系统配置
  configMain: {
    version:'',
    supportedThemes: '',
    admin_supportedFileTypes: '.jpg, .jpeg, .png, .gif, .webp',
    admin_maxUploadFileSize: 20971520,
    admin_maxUploadFileNumber: 5
  }
}

const mutations = {
//   CHANGE_SETTING: (state, { key, value }) => {
//     // eslint-disable-next-line no-prototype-builtins
//     if (state.hasOwnProperty(key)) {
//       state[key] = value
//     }
//   }
    CONFIG_DATA: (state, configdata) => {
        state.configMain.version = configdata.version
        state.configMain.supportedThemes = configdata.currentTheme
        state.configMain.admin_supportedFileTypes = configdata.admin_supportedFileTypes
        state.configMain.admin_maxUploadFileSize = configdata.admin_maxUploadFileSize
        state.configMain.admin_maxUploadFileNumber = configdata.admin_maxUploadFileNumber
    },

    THME_NAME: (state, name) => {
        state.configMain.supportedThemes = name
    }
}

const actions = {
//   changeSetting({ commit }, data) {
//     commit('CHANGE_SETTING', data)
//   }
    configMain({ commit }, configdata) {
        //console.log(configdata);
        commit('CONFIG_DATA', configdata)
    },

    thmename({ commit }, name) {
        //console.log(configdata);
        commit('THME_NAME', name)
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

