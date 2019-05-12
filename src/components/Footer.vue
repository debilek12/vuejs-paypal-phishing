<template>
<footer class="footer" role="contentinfo">
   <div class="legalFooter">
      <div class="extendedContent">
         <ul class="footerGroup footerGroupWithSiblings">
            <li><a target="_blank" href="//paypal.com/webapps/mpp/ua/privacy-full" pa-marked="1">{{ language.privacy }}</a></li>
            <li><a target="_blank" href="//paypal.col" pa-marked="1">PayPal</a></li>
         </ul>
         <p class="footerCopyright">{{ language.copyright }}</p>
      </div>
   </div>
</footer>
</template>

<script>
export default {
  name: 'paypalFooter',
  props: ['language']
}
</script>