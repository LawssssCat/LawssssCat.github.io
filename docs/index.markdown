---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<script>
var api = 'https://api.github.com/repos/LawssssCat/LawssssCat.github.io'
var json = Ajax({
    type: "GET",
    url: api,
    async: true,
    params: {},
    responseType: "json",
    // contentType = "application/x-www-form-urlencoded", //xhr.setRequestHeader("Content-Type",option.contentType); 
    done: (json) => {
        console.log('succ',json);
        document.getElementById('title-photo').src=json.owner.avatar_url;
    },
    fail: () => {
        console.log('err');
    }
})
</script>

<img id='title-photo' alt="LICENSE" />

Github：<https://github.com/LawssssCat>

CSDN：<https://blog.csdn.net/LawssssCat>