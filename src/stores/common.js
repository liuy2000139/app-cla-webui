import { defineStore } from 'pinia';
export const useAppearance = () => useState('appearance', () => '');

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      chooseRepo: '' || undefined,
      chooseOrg: '' || undefined,
      orgChoose: false || undefined,
      repositoryChoose: false || undefined,
      isEmail: false || undefined,
      email: '' || undefined,
      repositoryValue: '' || undefined,
      orgValue: '' || undefined,
      repositoryOptions: [] || undefined,
      orgOptions: [] || undefined,
      userLimit: 0 || undefined,
      loginInfo: {} || undefined,
      linkId: '' || undefined,
      loginType: '' || undefined,
      platform: '' || undefined,
      domain: '' || undefined,
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
      individualCustomMetadataArr: [] || undefined,
      corporationCustomMetadataArr: [] || undefined,
      managerList: [] || undefined,
      corpItem: {} || undefined,
      orgAlias: '' || undefined,
      repo: '' || undefined,
      claLinkIndividual: '' || undefined,
      claLinkCorp: '' || undefined,
      individualMetadata: [] || undefined,
      corporationMetadata: [] || undefined,
      individualLanguage: '' || undefined,
      corpLanguage: '' || undefined,
      bindType: '' || undefined,
      addLang: '' || undefined,
      add_bind_first: false || undefined,
      findPwdEmail: '' || undefined,
      pafData: '',
      privacyTextObj: {},
      emailSuffixArr: [] || undefined,
      lang: '',
      cla_id: 0,
      showHeaderMenu: '',
    };
  },

  actions: {
    setShowHeaderMenu(data) {
      this.showHeaderMenu = data;
    },
    setClaId(data) {
      this.cla_id = data;
    },
    setLang(data) {
      this.lang = data;
    },
    setEmailSuffix(data) {
      this.emailSuffixArr = data;
    },
    setPrivacyData(data) {
      this.privacyTextObj = data;
    },
    setPdfData(data) {
      this.pdfData = data;
    },
    setFindPwdEmail(data) {
      this.findPwdEmail = data;
    },
    setAddBindFirst(data) {
      this.add_bind_first = data;
    },
    setEmailErr(data) {
      this.emailErrVisible = data;
    },
    setAddLang(data) {
      this.addLang = data;
    },
    setBindType(data) {
      this.bindType = data;
    },
    setCorpItem(data) {
      this.corpItem = data;
    },
    setCorpLanguage(data) {
      this.corpLanguage = data;
    },
    setIndividualLanguage(data) {
      this.individualLanguage = data;
    },
    setEmail(data) {
      this.email = data;
    },
    setIsEmail(isEmail) {
      this.isEmail = isEmail;
    },
    setIndividualMetadata(data) {
      this.individualMetadata = data;
    },
    setCorpMetadata(data) {
      this.corporationMetadata = data;
    },
    setClaLinkCorp(data) {
      this.claLinkCorp = data;
    },
    setClaLinkIndividual(data) {
      this.claLinkIndividual = data;
    },
    setOrgAlias(data) {
      this.orgAlias = data;
    },
    setRepo(data) {
      this.repo = data;
    },
    setChooseRepo(data) {
      this.chooseRepo = data;
    },
    setChooseOrg(data) {
      this.chooseOrg = data;
    },
    setManagerList(data) {
      this.managerList = data;
    },
    setIndividualCustomMetadataArr(individualCustomMetadataArr) {
      this.individualCustomMetadataArr = individualCustomMetadataArr;
    },
    setCorporationCustomMetadataArr(corporationCustomMetadataArr) {
      this.corporationCustomMetadataArr = corporationCustomMetadataArr;
    },
    setPwdIsChanged(data) {
      this.pwdIsChanged = data;
    },
    setToken(data) {
      this.access_token = data.access_token;
      this.refresh_token = data.refresh_token;
      this.platform_token = data.platform_token;
      // sessionStorage.setItem('token', data.access_token);
      // sessionStorage.setItem('refresh_token', data.refresh_token);
      // sessionStorage.setItem('platform_token', data.platform_token);
      data.resolve('complete');
    },
    setPlatform(platform) {
      this.platform = platform;
    },
    setLoginType(loginType) {
      this.loginType = loginType;
    },
    setLinkId(link_id) {
      this.linkId = link_id;
    },
    setLoginInfo(obj) {
      this.loginInfo = obj;
    },
    setUserLimit(userLimit) {
      this.userLimit = userLimit;
    },
    setOrgOption(orgOptions) {
      this.orgOptions = orgOptions;
    },
    setRepositoryOptions(repositoryOptions) {
      this.repositoryOptions = repositoryOptions;
    },
    setOrgValue(orgValue) {
      this.orgValue = orgValue;
    },
    setRepositoryValue(repositoryValue) {
      this.repositoryValue = repositoryValue;
    },
    setOrgChoose(orgChoose) {
      this.orgChoose = orgChoose;
    },
    setRepositoryChoose(repositoryChoose) {
      this.repositoryChoose = repositoryChoose;
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
    },
  },
});
