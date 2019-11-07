if(Meteor.isClient) {
    Router.configure({
        notFoundTemplate: 'notfound'
      });
Router.route('/',function(){
    this.render('dashboard');
});
Router.route('/y/2015',function(){
    this.render('Y2015');
});
Router.route('/y/2016',function(){
    this.render('Y2016');
});
Router.route('/new',function(){
    this.render('addform');
});
Router.onAfterAction(() =>{
$(".nav>li").removeClass("active");
$("a[href='"+Router.current().route.path()+"']").parents("li").addClass("active");
}

)

}