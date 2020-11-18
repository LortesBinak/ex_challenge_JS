const app = Vue.createApp({
    data:function(){
        return{
            selectedFile:null,
        }
    },

    methods:{
        evaluateCsv(){
            Papa.parse(this.selectedFile, {
                complete: function(results){
                    console.log("Finished:", results.data)
                }
            })
        },

        previewFiles(event){
            this.selectedFile = event.target.files[0]
        }
    }

});
app.mount('#programmingChallenge')