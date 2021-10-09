export const MixIns={
    data(){
       return {
        a:100
       }
    },
    methods:{
        add(){
            this.a++
        }
    },
    created(){
        this.a++
        console.log(this.a)   
        console.log("我是混入的生命周期函数")
      }
}