<?php /* Template Name: Services */ ?>
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
        #usecases{
            background: white;
        }
        
        .col-md-3{
            width: 33% !important;
        }
        .col-m-2{
            width: 25% !important;
        }
        
        .awards{
            text-align: center;
        }

        .awards p{
            font-weight: 600;
            font-size: 15px;
            padding-top: 20px;
            margin-bottom: 15px;
        }
        .awards h6{
            font-size: 42px;
            font-weight: 800;
        }
        input {
            color: #444;
            font-size:18px;
            outline: none;
            box-shadow: none;
            -webkit-appearance: none;
            border-radius: 0;
            border-top: none;
            border-left: solid 0px;
            border-right: solid 0px;
            border-bottom: solid 1px;
            border-color: #bbb;
            background: transparent;
            display: block;
            height: 2em;
            width: 12em;
            padding: 0 3%;
            position: relative;
        }
        #partner{
            background: white;
        }
        .mob-display{
            display: none;
        }

        .award-text{
            padding-top: 20px;
            font-size: 38px;
            font-weight: 600;
        }
        @media only screen and (max-width: 640px) {
            .award-text{
                font-size: 18px;
            }

            .mob-display{
                display: block;
            }
        }
    </style>
        
    <div class="content-container">
        <div id="intro">
            <div class="inner-container" style="padding-top:150px;">
                <div class="col-10 text-center mb-40">
                    <p class="font-14 bold js-fadeIn">OUR SERVICES</p>
                    <h2 class="headline-about js-fadeIn">
                        More about our services. Focused on Visual, Motion and Codes for Better Experiences
                    </h2>
                </div>

                <div class="js-fadeIn" style="width: 100%;border-top: 1px solid black;">
                    <div class="col-4 pt-60" style="padding-right: 10%;">
                        <p class="js-fadeIn fw-600">Awards and Honours</p>
                        <h1 class="js-fadeIn award-text">The award won by our projects</h1>
                        
                    </div>
                    <div class="col-6 pt-60 mob-pt-30 mob-none">
                        <p class="copy js-fadeIn">
                            We have completed 16 projects which created 10X Growth of Clients revenue and User Satisfaction
                        </p>
                        <div class="col-10 js-fadeIn" style="width: 100%;">
                            <div class="col-3 awards">
                                <img src="images/icons/4.png" style="max-width: 80px;">
                                <p>Clients So Far</p>
                                <h6>16</h6>
                            </div>

                            <div class="col-3 awards">
                                <img src="images/icons/5.png" style="max-width: 80px;">
                                <p>Customer Satisfaction</p>
                                <h6>5.0</h6>
                            </div>

                            <div class="col-3 awards">
                                <img src="images/icons/6.png" style="max-width: 80px;">
                                <p>Domain Worked</p>
                                <h6>6+</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mob-pt-30 mob-display" style="width:100%;padding-top: 60px;">
                        <div class="col-2 mob-font-10 js-fadeIn text-center">
                            <img class="mono" src="images/icons/4.png">
                            <p class="services-p">Clients So Far</p>
                            <h6 class="services-count">16</h6>
                        </div>

                        <div class="col-2 mob-font-10 js-fadeIn text-center">
                            <img class="mono" src="images/icons/5.png"><br/>
                            <p class="services-p">Customer Satisfaction</p>
                            <h6 class="services-count">5.0</h6>
                        </div>
                        
                        <div class="col-2 mob-font-10 js-fadeIn text-center">
                            <img class="mono" src="images/icons/6.png">
                            <p class="services-p">Domain Worked</p>
                            <h6 class="services-count">6+</h6>
                        </div>
                        
                    </div>
                </div>
            </div>
            <canvas id="canvas" class="logo-illustration" style="display: none;"></canvas>
        </div>
        
        <div id="usecases">
            <div class="inner-container">
                <div class="js-fadeIn col-10">
                    <h2 class="headline-big js-fadeIn f-36 text-center">
                        Around 16 Projects 4 Countries 2 Years
                    </h2>
                    <p class="js-fadeIn text-center mb-60">5.0 &#9733;&#9733;&#9733;&#9733;&#9733; from 6 reviews in Google</p>
                </div>
                <div class="js-fadeIn col-10 text-center">
                    <video src="video/1.mp4" loop="" autoplay="" muted="" style="width:95%;border-radius: 20px;"></video>
                </div>

                <div class="col-12 companies-list">
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono" src="images/companies/2.png">
                        <p class="font-14 mb-60">
                            <p class="bold font-14 mt--30 mb-05">WHO</p>
                            World Health Organization
                        </p>
                    </div>

                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono" src="images/companies/1.png"><br/>
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">WWF</p>
                            World Wide Fund
                        </p>
                    </div>
                    
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono" src="images/companies/3.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">GBIME</p>
                            Global IME Bank
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono" src="images/companies/4.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">NIBL</p>
                            Nepal Investment Bank
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono" src="images/companies/5.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">SBL</p>
                            Siddhartha Bank
                        </p>
                    </div>

                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono mt-50" src="images/companies/6.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">DH</p>
                            Dhulikhel Hospital
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono mt-50" src="images/companies/7.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">UTAAN</p>
                            University of Tokyo 
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono mt-50" src="images/companies/8.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">KYORIN</p>
                            Kyorin University
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center">
                        <img class="mono mt-50" src="images/companies/9.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">KMC</p>
                            Kathmandu Medical College
                        </p>
                    </div>
                    <div class="col-2 mob-font-10 js-fadeIn text-center mob-none">
                        <img class="mono mt-50" src="images/companies/10.png">
                        <p class="mb-60 font-14">
                            <p class="bold font-14 mt--30 mb-05">ASHA</p>
                            ASHA Japan
                        </p>
                    </div>
                </div>
                
            </div> 
        </div>

        <div id="solution" style="display:none;">
            
            <div id="solution-illustration" style="display: none;">
            </div>
        </div>


        <div id="problem">
            <div class="inner-container">
                <div class="problem-message">
                    <div class="col-12">
                        <h6 class="copy js-fadeIn" style="font-weight: 600;font-size: 20px;color:white;margin-top:30px;margin-bottom: 20px;">Work with our Pro Team</h6>
                        <h2 class="headline dark js-fadeIn" style="margin-bottom: 60px;font-size: 62px;font-weight: 600;">Would you like to have a partner for your professional project?<br> Let's talk about it!</h2>
                        <div style="text-align: left;">
                            <p class="copy js-fadeIn" style="color:white;margin-top: 60px;margin-bottom: 60px;">
                                hi@<?php echo "ayata.com.np"; ?>
                            </p>
                        </div>

                        <div style="text-align: left;">
                            <p class="copy js-fadeIn" style="color:white;margin-bottom: 120px;">
                                We are always open for talk about disruptive tech ideas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



<?php include "footer.php" ?>
