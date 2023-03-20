function make_condition(learn_img, recon_img, boundary_start, n_rounds, n_reconrep, input_dir, file_extension){
    

    // ** learning ** //
    var catA = _.map(_.range(10,180,10), function(x){return (x + boundary_start)%360});
    var catB = _.map(_.range(190,360,10), function(x){return (x + boundary_start)%360});
    
    var cond = []
    for (var i=1; i<=n_rounds; i++){
        for (var j of learn_img){
            if(catA.includes(j)){
                cond.push({
                    image_num: j,
                    image_name: input_dir+("000000"+j).slice(-6)+file_extension,
                    category: 'A',
                    round: i
                })
            }
            if(catB.includes(j)){
                cond.push({
                    image_num: j,
                    image_name: input_dir+("000000"+j).slice(-6)+file_extension,
                    category: 'B',
                    round: i
                })
            }            
        }

    }
    var learn = _.chunk(cond, 34)


    // ** pre-learning ** //
    var cond = []
    for(var i = 1; i<=n_reconrep; i++){
        for(var j of recon_img){
            var curr_cat = 'boundary'
            if (catA.includes(j)){  var curr_cat = 'A' } 
            if (catB.includes(j)){  var curr_cat = 'B' } 
            cond.push({
                image_num: j,
                image_name: input_dir+("000000"+j).slice(-6)+file_extension,
                category: curr_cat,
                repetition: i
            })
        }
    }
    var prelearn = _.chunk(cond, 24)

    // ** post-learning ** //
    var cond = []
    for(var i = 1; i<=n_reconrep; i++){
        for(var j of recon_img){
            var curr_cat = 'boundary'
            if (catA.includes(j)){  var curr_cat = 'A' } 
            if (catB.includes(j)){  var curr_cat = 'B' } 
            cond.push({
                image_num: j,
                image_name: input_dir+("000000"+j).slice(-6)+file_extension,
                category: curr_cat,
                repetition: i
            })
        }
    }
    var postlearn = _.chunk(cond, 24)

    var exp_condition = {
        prelearn: prelearn, 
        learn: learn, 
        postlearn: postlearn
    }


    return exp_condition
    
}