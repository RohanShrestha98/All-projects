<?php /* Template Name: Works */ ?>
<?php include "header.php" ?>

    <style type="text/css">
        .sidebar{
            display: none;
        }
        /*.meter{
            display: none;
        }*/
        .copyright{
            display: none;
        }
        #intro, #usecases{
            background: white;
        }

        .work{
            overflow: hidden;
        }
        
        .work img{
            margin-top: 60px;
            max-width: 100%;
            border-radius: 20px;
            transition: 0.5s all ease-in-out;
            cursor: pointer;
        }

        .work:hover img{
            transform: scale(1.02);
        
        }

        .work-description{
            padding-top: 20px;
            font-size: 28px !important;
            font-weight: 400;
            opacity: 1;
            transform: matrix(1, 0, 0, 1, 0, 0);
            padding-right: 15%;
        }

        .work-title{
            padding-top: 20px;
            font-size: 18px !important;
            font-weight: 400;
            opacity: 1;
            transform: matrix(1, 0, 0, 1, 0, 0);
        }

        .mt-0{
            margin-top: 0px !important;
        }

        .mb-0{
            margin-bottom: 0px !important;
        }
        .logo-type{
            opacity: 1;
            margin-left: 30px;
        }
    </style>
        
    <div class="content-container">
        <div id="intro" style="display:none;">
            <div class="inner-container">
            </div>
            <canvas id="canvas" class="logo-illustration" style="display: none;"></canvas>
        </div>
        
        <div id="usecases">
            <div class="inner-container" style="padding-top:150px;">
                <div class="js-fadeIn" style="width: 100%;">
                    <div class="col-5 work pt-60 mob-pt-0 desk-pr-5">
                        <p class="js-fadeIn fw-600">Explore our works</p>
                        <h1 class="js-fadeIn work-description" style="font-size: 22px !important;">We can build new digital products from the ground up, or upgrade existing ones to cope with new demands and a growing user base.</h1>

                        <img src="images/work/Frame1.png">
                        <h1 class="js-fadeIn work-title mt-10">Kilindar</h1>
                        <p class="js-fadeIn copy mb-0">Mobile Application Development</p>


                        <img src="images/work/Frame4.png">
                        <h1 class="js-fadeIn work-title mt-10">Aura</h1>
                        <p class="js-fadeIn copy mb-0">UI/UX Design, Mobile Application</p>



                    </div>
                    <div class="col-5 work pt-60">
                        <img class="mt-0" src="images/work/Frame3.png">
                        <h1 class="js-fadeIn work-title mt-10">Gaavaa</h1>
                        <p class="js-fadeIn copy mb-0">System Architecture & Design</p>

                        <img src="images/work/Frame2.png">
                        <h1 class="js-fadeIn work-title mt-10">ASHA Connect</h1>
                        <p class="js-fadeIn copy mb-0">Mobile Apllication Development</p>

                    </div>
                </div>
            </div> 
        </div>

        <div id="solution" style="display:none;">       
            <div id="solution-illustration" style="display: none;">
            </div>
        </div>

        <div id="problem" style="display:none;">
        </div>

        
    
<?php include "footer.php" ?>
