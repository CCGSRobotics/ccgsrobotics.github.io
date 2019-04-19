var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
  ['bold', 'italic', 'underline', 'strike'],    // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],           // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],  // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],      // outdent/indent
  [{ 'direction': 'rtl' }],                     // text direction
// custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'],

  ['image', 'video']
  ]
  },
  placeholder: 'Begin Blogging!',
  theme: 'snow'  // or 'bubble'
});
