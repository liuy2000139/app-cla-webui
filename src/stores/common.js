import { defineStore } from 'pinia';
export const useAppearance = () => useState('appearance', () => '');
console.log(sessionStorage.getItem('orgOptions'));
export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      chooseRepo: sessionStorage.getItem('chooseRepo') || undefined,
      chooseOrg: sessionStorage.getItem('chooseOrg') || undefined,
      claChoose: sessionStorage.getItem('claChoose') || undefined,
      orgChoose: sessionStorage.getItem('orgChoose') || undefined,
      repositoryChoose: sessionStorage.getItem('repositoryChoose') || undefined,
      isEmail: sessionStorage.getItem('isEmail') || undefined,
      email: sessionStorage.getItem('email') || undefined,
      repositoryValue: sessionStorage.getItem('repositoryValue') || undefined,
      orgValue: sessionStorage.getItem('orgValue') || undefined,
      repositoryOptions:
        sessionStorage.getItem('repositoryOptions') || undefined,
      orgOptions: JSON.parse(sessionStorage.getItem('orgOptions')) || undefined,
      userLimit: sessionStorage.getItem('userLimit') || undefined,
      loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || undefined,
      linkId: sessionStorage.getItem('linkId') || undefined,
      loginType: sessionStorage.getItem('loginType') || undefined,
      platform: sessionStorage.getItem('platform') || undefined,
      domain: sessionStorage.getItem('domain') || undefined,
      access_token: sessionStorage.getItem('token') || undefined,
      refresh_token: sessionStorage.getItem('refresh_token') || undefined,
      platform_token: sessionStorage.getItem('platform_token') || undefined,
      customVisible: false,
      dialogVisible: false,
      emailErrVisible: false,
      dialogMessage: '',
      reTryDialogVisible: false,
      signSuccessDialogVisible: false,
      signReLoginDialogVisible: false,
      orgReLoginDialogVisible: false,
      pwdIsChanged: false,
      individualCustomMetadataArr:
        JSON.parse(sessionStorage.getItem('individualCustomMetadataArr')) ||
        undefined,
      corporationCustomMetadataArr:
        JSON.parse(sessionStorage.getItem('corporationCustomMetadataArr')) ||
        undefined,
      managerList:
        JSON.parse(sessionStorage.getItem('managerList')) || undefined,
      corpItem: JSON.parse(sessionStorage.getItem('corpItem')) || undefined,
      orgAlias: sessionStorage.getItem('orgAlias') || undefined,
      repo: sessionStorage.getItem('repo') || undefined,
      claLinkIndividual:
        sessionStorage.getItem('claLinkIndividual') || undefined,
      claLinkCorp: sessionStorage.getItem('claLinkCorp') || undefined,
      individualMetadata:
        JSON.parse(sessionStorage.getItem('individualMetadata')) || undefined,
      corporationMetadata:
        JSON.parse(sessionStorage.getItem('corporationMetadata')) || undefined,
      individualLanguage:
        sessionStorage.getItem('individualLanguage') || undefined,
      corpLanguage: sessionStorage.getItem('corpLanguage') || undefined,
      bindType: sessionStorage.getItem('bindType') || undefined,
      addLang: sessionStorage.getItem('addLang') || undefined,
      add_bind_first: sessionStorage.getItem('add_bind_first') || undefined,
      findPwdEmail: sessionStorage.getItem('findPwdEmail') || undefined,
      pafData: '',
      privacyTextObj: {},
      emailSuffixArr:
        JSON.parse(sessionStorage.getItem('emailSuffixArr')) || undefined,
    };
  },
  actions: {
    setEmailSuffix(data) {
      this.emailSuffixArr = data;
      sessionStorage.setItem('emailSuffixArr', JSON.stringify(data));
    },
    setPrivacyData(data) {
      this.privacyTextObj = data;
    },
    setPdfData(data) {
      this.pdfData = data;
    },
    setFindPwdEmail(data) {
      this.findPwdEmail = data;
      sessionStorage.setItem('findPwdEmail', data);
    },
    setAddBindFirst(data) {
      this.add_bind_first = data;
      sessionStorage.setItem('add_bind_first', data);
    },
    setEmailErr(data) {
      this.emailErrVisible = data;
    },
    setAddLang(data) {
      this.addLang = data;
      sessionStorage.setItem('addLang', data);
    },
    setBindType(data) {
      this.bindType = data;
      sessionStorage.setItem('bindType', data);
    },
    setCorpItem(data) {
      this.corpItem = data;
      sessionStorage.setItem('corpItem', JSON.stringify(data));
    },
    setCorpLanguage(data) {
      this.corpLanguage = data;
      sessionStorage.setItem('corpLanguage', data);
    },
    setIndividualLanguage(data) {
      this.individualLanguage = data;
      sessionStorage.setItem('individualLanguage', data);
    },
    setEmail(data) {
      this.email = data;
      sessionStorage.setItem('email', data);
    },
    setIsEmail(state, isEmail) {
      this.isEmail = isEmail;
      sessionStorage.setItem('isEmail', isEmail);
    },
    setIndividualMetadata(data) {
      this.individualMetadata = data;
      sessionStorage.setItem('individualMetadata', JSON.stringify(data));
    },
    setCorpMetadata(data) {
      this.corporationMetadata = data;
      sessionStorage.setItem('corporationMetadata', JSON.stringify(data));
    },
    setClaLinkCorp(data) {
      this.claLinkCorp = data;
      sessionStorage.setItem('claLinkCorp', data);
    },
    setClaLinkIndividual(data) {
      this.claLinkIndividual = data;
      sessionStorage.setItem('claLinkIndividual', data);
    },
    setOrgAlias(data) {
      this.orgAlias = data;
      sessionStorage.setItem('orgAlias', data);
    },
    setRepo(data) {
      this.repo = data;
      sessionStorage.setItem('repo', data);
    },
    setChooseRepo(data) {
      this.chooseRepo = data;
      sessionStorage.setItem('chooseRepo', data);
    },
    setChooseOrg(data) {
      this.chooseOrg = data;
      sessionStorage.setItem('chooseOrg', data);
    },
    setManagerList(data) {
      this.managerList = data;
      sessionStorage.setItem('managerList', JSON.stringify(data));
    },
    setIndividualCustomMetadataArr(state, individualCustomMetadataArr) {
      this.individualCustomMetadataArr = individualCustomMetadataArr;
      sessionStorage.setItem(
        'individualCustomMetadataArr',
        JSON.stringify(individualCustomMetadataArr)
      );
    },
    setCorporationCustomMetadataArr(state, corporationCustomMetadataArr) {
      this.corporationCustomMetadataArr = corporationCustomMetadataArr;
      sessionStorage.setItem(
        'corporationCustomMetadataArr',
        JSON.stringify(corporationCustomMetadataArr)
      );
    },
    setPwdIsChanged(data) {
      this.pwdIsChanged = data;
      sessionStorage.setItem('pwdIsChanged', data);
    },
    setToken(data) {
      this.access_token = data.access_token;
      this.refresh_token = data.refresh_token;
      this.platform_token = data.platform_token;
      sessionStorage.setItem('token', data.access_token);
      sessionStorage.setItem('refresh_token', data.refresh_token);
      sessionStorage.setItem('platform_token', data.platform_token);
      data.resolve('complete');
    },
    setPlatform(platform) {
      this.platform = platform;
      sessionStorage.setItem('platform', platform);
    },
    setLoginType(loginType) {
      this.loginType = loginType;
      sessionStorage.setItem('loginType', loginType);
    },
    setLinkId(link_id) {
      this.linkId = link_id;
      sessionStorage.setItem('linkId', link_id);
    },
    setLoginInfo(obj) {
      this.loginInfo = obj;
      sessionStorage.setItem('loginInfo', JSON.stringify(obj));
    },
    setUserLimit(userLimit) {
      this.userLimit = userLimit;
      sessionStorage.setItem('userLimit', userLimit);
    },
    setOrgOption(orgOptions) {
      this.orgOptions = orgOptions;
      sessionStorage.setItem('orgOptions', JSON.stringify(orgOptions));
    },
    setRepositoryOptions(repositoryOptions) {
      this.repositoryOptions = repositoryOptions;
      sessionStorage.setItem(
        'repositoryOptions',
        JSON.stringify(repositoryOptions)
      );
    },
    setOrgValue(orgValue) {
      this.orgValue = orgValue;
      sessionStorage.setItem('orgValue', orgValue);
    },
    setRepositoryValue(repositoryValue) {
      this.repositoryValue = repositoryValue;
      sessionStorage.setItem('repositoryValue', repositoryValue);
    },
    setOrgChoose(orgChoose) {
      this.orgChoose = orgChoose;
      sessionStorage.setItem('orgChoose', orgChoose);
    },
    setRepositoryChoose(repositoryChoose) {
      this.repositoryChoose = repositoryChoose;
      sessionStorage.setItem('repositoryChoose', repositoryChoose);
    },
    errorSet(obj) {
      this.dialogVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    setCustomVisible(obj) {
      this.customVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    errorCodeSet(obj) {
      this.reTryDialogVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    setSignSuccess(obj) {
      this.signSuccessDialogVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    setSignReLogin(obj) {
      this.signReLoginDialogVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    setOrgReLogin(obj) {
      this.orgReLoginDialogVisible = obj.dialogVisible;
      this.dialogMessage = obj.dialogMessage;
    },
    setCorpToken(token) {
      this.access_token = token;
      sessionStorage.setItem('token', token);
    },
    setDomain(domain) {
      this.domain = domain;
      sessionStorage.setItem('domain', domain);
    },

    setCorpTokenAct({ commit }, token) {
      commit('setCorpToken', token);
    },
    setUserLimitAct({ commit }, userLimit) {
      commit('setUserLimit', userLimit);
    },
    setLoginInfoAct({ commit }, obj) {
      commit('setLoginInfo', obj);
    },
    setLinkIdAct({ commit }, link_id) {
      commit('setLinkId', link_id);
    },
    setLoginTypeAct({ commit }, loginType) {
      commit('setLoginType', loginType);
    },
    setPlatformAct({ commit }, platform) {
      let initials = platform.substring(0, 1);
      let upper = initials.toUpperCase();
      let end = platform.substring(1);
      commit('setPlatform', upper + end);
    },
  },
});
