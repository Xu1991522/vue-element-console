import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getRoleCode, setRoleCode, removeRoleCode, getRoleList, setRoleList, removeRoleList } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: getRoleCode() || '',
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: getRoleList() || [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // token
    Token({ commit }, roles) {
      commit('SET_TOKEN', roles)
    },
    // code
    Code({ commit }, code) {
      commit('SET_CODE', code)
    },
    // roles
    Roles({ commit }, roles) {
      commit('SET_ROLES', roles)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          // if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          //   reject('error')
          // }
          console.log('state.token================')
          console.log(state.token)
          console.log(response)
          const data = response.data
          console.log(data)
          console.log('response.data================')
          if (data.data && data.data.length > 0) { // 验证返回的roles是否是一个非空数组
            const roles = data.data
            var t1 = roles.map((value, key) => {
              return value.code
              // return t1.push(value.code)
            })
            console.log('t1===')
            console.log(t1)
            console.log('t1===')
            setRoleList(t1)
            commit('SET_ROLES', t1)
            // commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          const arr = data.data
          const _name = arr[0].name
          const _code = arr[0].code
          console.log(_code)
          setRoleCode(_code)
          commit('SET_NAME', _name)
          commit('SET_CODE', _code)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_CODE', '')
          removeToken()
          removeRoleList()
          removeRoleCode()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_CODE', '')
        removeToken()
        removeRoleList()
        removeRoleCode()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
