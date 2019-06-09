<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>石橋勲BAND オフィシャルウェブサイト</title>
        <meta name="description" content="石橋勲BANDのオフィシャルウェブサイトです。ライブスケジュール、チケット予約などはこちらから。">
        <meta name="keywords" content="石橋勲BAND,石橋勲バンド,石橋勲,俺の別所,和貴,kunijoker">
        <meta property="og:title" content="石橋勲BAND オフィシャルウェブサイト">
        <meta property="og:description" content="石橋勲BANDのオフィシャルウェブサイトです。ライブスケジュール、チケット予約などはこちらから。">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="石橋勲BAND">
        <meta property="og:image" content="http://isibashiisaoband.kill.jp/img/isaoband_ogp.png">
        <meta property="og:url" content="http://isibashiisaoband.kill.jp/">
        <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">
        <link rel="canonical" href="http://isibashiisaoband.kill.jp/">
        <link rel="alternate" media="only screen and (max-width: 640px)" href="http://isibashiisaoband.kill.jp/index_sp.html">

        <link href="https://fonts.googleapis.com/css?family=Codystar|Rye" rel="stylesheet">
        <link rel="stylesheet" href="css/style_sp.css?171128" type="text/css" media="all">
        <link href="css/slick.css" rel="stylesheet" type="text/css">
        <link href="css/slick-theme.css" rel="stylesheet" type="text/css">
        <link href="css/animate.css" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-103597457-1', 'auto');
          ga('send', 'pageview');
        </script>
    </head>
    <body id="top">
        <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.9";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
        
        <div id="for_pc">
            <a href="index.html">PC版を表示する</a>
        </div>

        <?php include_once("inc/content.php"); ?>

        <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script type="text/javascript" src="js/slick.js"></script>
        <script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript">
            $(function() {
                $(document).ready(function(){
                    var $slider = $('.slider');
                    $slider.slick({
                        autoplay: true,
                        arrows: false,
                        adaptiveHeight: true
                    });
                });
            });
        </script>
        <script type="text/javascript" src="js/paper-fall.js"></script>
        <script type="text/javascript">
            var max = 80;
            var id = 'paper-fall';
            var size = 5;
            var color = [{ 'r': '193', 'g': '11', 'b': '0' }, { 'r': '221', 'g': '221', 'b': '221' }, { 'r': '221', 'g': '221', 'b': '221' }, { 'r': '227', 'g': '219', 'b': '127' }, { 'r': '227', 'g': '219', 'b': '127' }, { 'r': '227', 'g': '219', 'b': '127' }];
            var alpha = 0.7;
            Paper.init( id, max, size, color, alpha );
        </script>
    </body>
</html>
