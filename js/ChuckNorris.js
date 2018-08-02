let dad = new Vue({
    // the element on the main page to be replaced with our vue app
    el: '#dad',

    // The data that will bind to our template
    data: {
        appName: 'Chuck Norris',
        selected:[],
        randomJoke:'',
        selected1:'',
        searchJoke:'',
        SearchedJoke:[],
        searchHistory:[],
        totalSearch:'',
        isFetchingAJoke: false
    },



    // Methods that may be called on our vue object
    methods:{

        getcategories:function(){

          this.isFetchingAJoke = true

            let viewModel = this

            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){

               viewModel.isFetchingAJoke = false
              console.log(response)

                   viewModel.selected = response.data
                   console.log(response);

            })
            .catch((err)=>{
                alert(err)
            })
        },
        getJoke:function(e)
        {
           if(this.selected1 == 'Any')
            {
            let viewModel = this
              axios.get('https://api.chucknorris.io/jokes/random', {
                headers: {
                    Accept: 'application/json'
                }
            }
          )
            .then(function(response){

                   viewModel.randomJoke = response.data.value
                   viewModel.url= response.data.url
                   viewModel.image_url=response.data.icon_url
                    console.log("Url is",viewModel.url);
                   console.log(viewModel.image_url);
            })
            .catch((err)=>{
                alert(err)
            })
        }
          else {
            let viewModel = this
              let sub_cat=this.selected1
              console.log(sub_cat);
            axios.get('https://api.chucknorris.io/jokes/random?category='+sub_cat, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){


                   viewModel.randomJoke = response.data.value
                   viewModel.url= response.data.url
                   viewModel.image_url=response.data.icon_url
                   console.log(viewModel.image_url);
            })
            .catch((err)=>{
                alert(err)
            })
          }
      },
        getsearch:function(e){

                      let viewModel = this
                  //    alert(viewModel.searchJoke)
                          viewModel.searchHistory.push(viewModel.searchJoke)
                      axios.get('https://api.chucknorris.io/jokes/search?query='+viewModel.searchJoke, {
                          headers: {
                              Accept: 'application/json'
                          }
                      })
                      .then(function(response){
                             viewModel.totalSearch=response.data.total

                                response.data.result.forEach(items=>{

                                  items.value = items.value.replace(viewModel.searchJoke,"<span style=background-color:yellow>"+viewModel.searchJoke+"</span>")
                                    console.log(items.value);
                                  viewModel.SearchedJoke.push(items.value)

                                })

                      })
                      .catch((err)=>{
                          alert(err)
                      })
        }

    },  created: function(){
        this.getcategories()
      }


})
