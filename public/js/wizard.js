#!/usr/bin/node

// Multi-step Wizard Form
(function($) {
  // For error-handling
  'use strict';

  // Horizontal wizard: ID1
  var form = $("#example-form");
  form.children("div").steps({
    // Tags: h3, section
    headerTag: "h3",
    bodyTag: "section",
    // Transition between steps
    transitionEffect: "slideLeft",
    // Callback with alert after submission
    onFinished: function(event, currentIndex) {
      alert("Submitted!");
    }
  });

  // Horizontal wizard: ID2
  var validationForm = $("#example-validation-form");
  validationForm.val({
    // Error placement function
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    // Validation rules
    rules: {
      confirm: {
        equalTo: "#password"
      }
    }
  });

  // Configuring steps for the form
  validationForm.children("div").steps({
    // Tags: h3, section
    headerTag: "h3",
    bodyTag: "section",
    // Transition effect
    transitionEffect: "slideLeft",
    // Callback function trigger when changing steps
    onStepChanging: function(event, currentIndex, newIndex) {
      validationForm.val({
        ignore: [":disabled", ":hidden"]
      })
      // Return if form is valid
      return validationForm.val();
    },
    // Callback before finishing
    onFinishing: function(event, currentIndex) {
      validationForm.val({
        ignore: [':disabled']
      })
      // Return if form is valid
      return validationForm.val();
    },
    // Callback with alert after submission
    onFinished: function(event, currentIndex) {
      alert("Submitted!");
    }
  });

  // Vertical wizard: ID3
  var verticalForm = $("#example-vertical-wizard");
  verticalForm.children("div").steps({
    // Tags: h3, section
    headerTag: "h3",
    bodyTag: "section",
    // Transition effect
    transitionEffect: "slideLeft",
    // Vertical orientation
    stepsOrientation: "vertical",
    // Callback with alert after submission
    onFinished: function(event, currentIndex) {
      alert("Submitted!");
    }
  });
})(jQuery);