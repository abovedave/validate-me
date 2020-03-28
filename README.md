Proof of concept for a JS enhancement to [HTML5 form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation), so you can display errors in `<span>` elements that you can style to your needs.

Example, making sure a field is no more than 15 characters and only lowercase.

```
<form class="js-validate-form"> 
    <input class="js-validate-field" type="text" title="Should be lowercase and less than 15 chars" required pattern="[a-z]{2,15}">
    <button class="js-validate-submit" type="submit>Submit form</button>
</form>
```

## How to use

1. Add the js file before closing `</body>` tag
2. Add the class `js-validate-form` to your `<form>`(s)
3. For every field you want to validate add the class `js-validate-field`
4. Add a submit button with class `js-validate-submit`

## Limitations

- No `<select>` support
- Disables a the button of class `js-validate-submit` - only enabled if form becomes valid
