<?php /* Template Name Career */ ?>
<?php include("header.php") ?>

<script>
    const rooster = new Rooster('#rooster', 18183);
    rooster.setup();
</script>

<div id="rooster"></div>

<style type="text/css">
    .rooster-search{
        padding: 0.6rem 1rem;
        flex: 1;
    }
    .rooster-job {
        padding: 1.4rem 0rem;
    }
    .rooster-job:not(:last-child){
        border-bottom: 1px solid #EEEEEE;
    }
    .rooster-job a{
        color: rgb(10,10,10);
        text-decoration: none;
    }
    .rooster-job h3{
        padding: 0;
        margin: 0 0 0.4rem 0;
        font-size: 1.2rem;
        font-weight: 600;
        text-decoration: none;
    }
    .rooster-job h4{
        padding: 0;
        margin: 0;
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
    }
    .rooster-department-header{
        font-size: 1.4rem;
        margin: 0px;
        padding: 2rem 0rem 0rem;
        color: rgb(21, 178, 211);
    }
    .rooster-department-header h3{
        margin-bottom: 0px;
        font-weight: 700;
    }
    .rooster-job .data-row{
        padding: 0rem 0rem 0.4rem 0rem;
        font-size: 0.924rem;
    }
    .rooster-job .inline-value{
        padding-right: 0.6rem;
        margin-right: 0.6rem;
        color: rgba(10,10,10,1);
    }
    .rooster-job .inline-value:not(:last-child){
        border-right: 1px solid rgba(10,10,10,0.1);
    }
</style>
<?php include("footer.php"); ?>
