const app = Vue.createApp({
    data:function(){
        return{
            selectedFile:null,
            selectedListElement: false,
            parsingStatus: false,
            parsedFileArray: [],
            parsedFileKeys: [],
            inputKey1: '',
            inputKey2:'',
            outputkey:'',
            outputvalue:'',
            evaluationResult:'',
            temp:'',
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
                    that.saveCsvData(results.data)
                    //results.data.map((data, index)=> {
                    //  that.saveCsvData(data)
                    //})
                    
                }
            })
            this.parsingStatus = !this.parsingStatus
        },

        getFileHeader(array){
            this.parsedFileKeys = array
        },

        setInputKey1(value, trigger){
            if(trigger === '1'){
                this.inputKey1 = value
                console.log(this.inputKey1)
            } else if (trigger === '2'){
                this.inputKey2 = value
                console.log(this.inputKey2)
            }
        },

        setOutputKey1(value){
            this.outputkey = value
            console.log(this.outputkey)
            this.selectedListElement = true
        },

        saveCsvData(data){
            this.parsedFileArray = data
            console.log(this.parsedFileArray) 
            
        },

        evaluateCsv(){
            var inp1 = this.inputKey1
            var inp2 = this.inputKey2
            var outp = this.outputkey

            console.log(inp1 + ' ' + inp2 + ' '+ outp)

            var temp1 = this.parsedFileArray[0]["MxT"] - this.parsedFileArray[0]["MnT"]
            var temp2 = this.parsedFileArray[0][this.outputkey]
            for(var i=0; i < this.parsedFileArray.length; i++){
                if((this.parsedFileArray[i]["MxT"] - this.parsedFileArray[i]["MnT"]) < temp1 ){
                    temp1 = this.parsedFileArray[i]["MxT"] - this.parsedFileArray[i]["MnT"]
                    temp2 = this.parsedFileArray[i][this.outputkey]
                }               
            }
            this.outputvalue = temp2
            console.log(this.outputvalue)
        },
    }

});
app.mount('#programmingChallenge')
