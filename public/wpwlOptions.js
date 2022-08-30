var wpwlOptions = {
    locale: "ar",
    registrations: {
      requireCvv: false,
      hideInitialPaymentForms: true
  },
    onReady: function() {
      console.log(jQuery('.wpwl-form.wpwl-form-card'));
        var createRegistrationHtml = '<div class="customLabel">Store payment details?</div><div class="customInput"><input type="checkbox" name="createRegistration" value="true" /></div>';
        jQuery('.wpwl-form.wpwl-form-card').find('.wpwl-wrapper-submit').before(createRegistrationHtml);
      }
}