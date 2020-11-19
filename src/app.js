const app = Vue.createApp({
    data:function(){
        return{
            selectedFile:null,
            parsingStatus: false,
            parsedFileArray: [],
            parsedFileKeys: [],
            parsedFileObject:{},
            maximum: '',
        }
    },

    methods:{
        previewFiles(event){
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
        },

        parseCsv(){
            const that = this
            Papa.parse(this.selectedFile, {
                download:true,
                header: true,
                complete: function(results){
                    that.getFileHeader(Object.keys(results.data[0]))
                    results.data.map((data, index)=> {
                      that.evaluateCsv(data)
                    })
                    
                }
            })
            this.parsingStatus = !this.parsingStatus
        },

        getFileHeader(array){
            this.parsedFileKeys = array
            console.log(this.parsedFileKeys)
        },

        evaluateCsv(data){
            this.parsedFileArray.push (data["MxT"])
            console.log(this.parsedFileArray) 
        }

       
    }

});
app.mount('#programmingChallenge')
