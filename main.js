Webcam.set({

    width: 350,
    height:300,
    img_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('camera');

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = "<img src= '" + data_uri+"'id = 'captured_image'>";
    });
    
}

console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/APj2kIj2r/model.json',modelLoaded);

function modelLoaded(){

    console.log('Model Loaded!');
}

function speak(){

    var synth = window.speechSynthesis;
    speak_data1 = " The First Prediction Is " + prediction1;
    speak_data2 = " The Second Prediction Is " + prediction2;
    utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}

function check(){

    img = document.getElementById("captured_image");
    classifier.classify(img, gotresults);

}

function gotresults(error,results){

    if(error){
        
        console.error(error);
    
    }

    else{

        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediction1 = results[0].label;
        prediction2 = results[1].label;

        speak();

        if(prediction1=="happy"){

            document.getElementById("update_emoji").innerHTML = "&#128512;";

        }

        if(prediction1=="sad"){

            document.getElementById("update_emoji").innerHTML = "&#128546;";
            
        }

        if(prediction1=="angry"){

            document.getElementById("update_emoji").innerHTML = "&#128545;";
            
        }

        if(prediction2=="happy"){

            document.getElementById("update_emoji2").innerHTML = "&#128512;";

        }

        if(prediction2=="sad"){

            document.getElementById("update_emoji2").innerHTML = "&#128546;";
            
        }

        if(prediction2=="angry"){

            document.getElementById("update_emoji2").innerHTML = "&#128545;";
            

        
        }
    }
}
