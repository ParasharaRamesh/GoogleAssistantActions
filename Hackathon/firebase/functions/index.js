
'use strict';

// Import the Dialogflow module and response creation dependencies from the 
// Actions on Google client library.
const {
    dialogflow,
    Permission,
    Suggestions,
    BasicCard,
    List,
    Carousel,
  } = require('actions-on-google');


// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});


var index = ['1','2','3','4','5','6'];
var i = 0;  
var depr_score = 0; 
var anx_score = 0;
var user_response = " ";
app.intent("question",(conv)=> {
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    return;
  }
  conv.ask(`<speak>${questionMap[index[i]].question}</speak>`);
  conv.ask(new Suggestions(`${questionMap[index[i]].option1}`,`${questionMap[index[i]].option2}`,`${questionMap[index[i]].option3}`,`${questionMap[index[i]].option4}`));
 // conv.ask(`<speak>you said ${conv.input.raw}</speak>`);
  });   
  
  
app.intent("Default Fallback Intent",(conv)=> {
  i = i + 1;
  console.log('*****************************************************');
  if(i!=6){
    
  console.log('*****************************************************1');
    conv.ask(`<speak>${questionMap[index[i]].question}</speak>`);
    conv.ask(new Suggestions(`${questionMap[index[i]].option1}`,`${questionMap[index[i]].option2}`,`${questionMap[index[i]].option3}`,`${questionMap[index[i]].option4}`));
    user_response =conv.input.raw;
  }
  if(questionMap[index[i-1]].tag == 0)
  {
    
  console.log('*****************************************************2');
    if(user_response == questionMap[index[i-1]].option1)
      depr_score = depr_score + 0;
    else if(user_response == questionMap[index[i-1]].option2)
      depr_score = depr_score + 1;
    else if(user_response == questionMap[index[i-1]].option3)
      depr_score = depr_score + 2;
    else if(user_response == questionMap[index[i-1]].option4)
      depr_score = depr_score + 3;
  }
  else{
    if(user_response == questionMap[index[i-1]].option1)
    anx_score = anx_score + 0;
  else if(user_response == questionMap[index[i-1]].option2)
    anx_score = anx_score + 1;
  else if(user_response == questionMap[index[i-1]].option3)
    anx_score = anx_score + 2;
  else if(user_response == questionMap[index[i-1]].option4)
    anx_score = anx_score + 3;
}

console.log('*****************************************************3');
  if(i==6){
      
 //   conv.ask(`It is very common to experience depression and anxiety together and you might have some symptoms of both,It seems like you have scored ${depr_score} out of 9 in depression test and ${anx_score} out of 9 in anxiety test`);
 if(depr_score<5 && anx_score<5)
 {
   conv.close(`<speak>Hey you're good to go,its maybe just a phase.\n</speak>`);
 }
    
 else if(depr_score>=5 && anx_score>=5)
    {
      conv.ask(`It is very common to experience depression and anxiety together.You might have some symptoms of both,it seems like you have scored ${depr_score} out of 9 in depression test and ${anx_score} out of 9 in anxiety test.Hey friend it seems like you have both depression and anxiety,remember "Once you choose hope,anything is possible".If you want you can go ahead and write to feelingsuicidal@sumaitri.net or call 011-23389090\n`);  
    }
 else if(depr_score >= 5) //depression
    {
      conv.ask(`<speak>It is very common to experience depression and anxiety together.You might have some symptoms of both,it seems like you have scored ${depr_score} out of 9 in depression test and ${anx_score} out of 9 in anxiety test.Hey it also seems like you have depression,remember friend "Once you choose hope,anything is possible".If you want you can go ahead and write to feelingsuicidal@sumaitri.net or call 011-23389090.</speak>`);            
    }
  else if(anx_score >= 5) //anxiety
    {
      conv.ask(`<speak>It is very common to experience depression and anxiety together.You might have some symptoms of both,it seems like you have scored ${depr_score} out of 9 in depression test and ${anx_score} out of 9 in anxiety test.Hey it seems like you have anxiety,"Taking the first step is always the hardest,you can choose how you feel and be strong"..You can call the helpline +9180-25497777.</speak>`)
    }
 
      conv.close(`\n<speak>Remember, It happens to one in every five people and you are not alone!!!</speak>`);

  }
});   
  
  

  var questionMap = {
      '1':{
       question:"How often have you bothered by feeling down,depressed,irritable or hopeless over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
       tag:"0",
   },

'2':{
       question:"How often have you been bothered by feeling nervous, anxious or on edge over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'3':{
       question:"How often have you been bothered that you have little interest or pleasure in doing things over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },

'4':{
       question:"How often have you been bothered by not being able to stop or control worrying over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'5':{
       question:"How often have you been bothered by trouble falling asleep, staying asleep, or sleeping too much over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },


'6':{
       question:"How often have you been bothered by worrying too much about different things over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'7':{
       question:"How often have you been bothered that you have poor appetite, weight loss, or overeating over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },
'8':{
       question:"How often have you been bothered by having trouble relaxing over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'9':{
       question:"How often have you been bothered by feeling tired, or having little energy over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },
'10':{
       question:"How often have you been bothered by being so restless that it is hard to sit still over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },

'11':{
       question:"How often have you been bothered by feeling bad about yourself – or feeling that you are a failure, or that you have let yourself or your family down over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },
'12':{
       question:"How often have you been bothered by becoming easily annoyed or irritable over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'13':{
       question:"How often have you been bothered that you have trouble concentrating on things like school work, reading, or watching TV over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },
'14':{
       question:"How often have you been bothered by feeling afraid as if something awful might happen over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"1",
   },
'15':{
       question:"How often have you been bothered that you have trouble concentrating on things like school work, reading, or watching TV over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   },
'16':{
       question:"How often have you been bothered by feeling afraid as if something awful might happen over the last two weeks?",
       option1:"Not at all",
       option2:"Several days",
       option3:"More than half the days",
       option4:"Nearly every day",
      tag:"0",
   }



  }
  app.intent('Default Welcome Intent', (conv) => {
    // conv.ask(new Permission({
    //   context: 'Hi there, I wuld liketo get to know you better',
    //   permissions: 'NAME',
    //   suggestions: new Suggestions('yes','no')
    // }));
    conv.ask("<speak>how are you doing today?</speak>");
    //conv.ask(new Suggestions('yes','no'));
  });
 
app.intent('capture feeling',(conv,{feeling})=>{
    conv.ask(`<speak>Why are you feeling ${feeling}?</speak>`);
    conv.ask(`<speak>Wanna talk about it ?</speak>`);
    
});

app.intent('capture feeling - yes',(conv)=>{
    conv.ask(`<speak>Go ahead I am listening</speak>`);
});


app.intent('capture feeling - yes - custom',(conv)=>{
  //conv.ask("debug first");
  const text = conv.input.raw;
  
  // var requestify = require('requestify');

  // requestify.get('http://172.16.2.157:5000/todo/api/v1.0/tasks?data='+require('querystring').escape(text))
  //   .then(function(response) {
  //       // Get the response body (JSON parsed or jQuery object for XMLs)
  //       console.log("********************************************************************");
  //       console.log(response.getBody());
  //   }
  // );

  
  // var http = require('http');
  // http.get('172.16.2.157:5000/todo/api/v1.0/tasks?data='+require('querystring').escape(text));
conv.ask(`dont worry take a deep breath and open up to me`);
conv.ask(`<speak>Do you wish to open up?</speak>`);
conv.ask(new Suggestions(`ask me a question`,`goodbye`));
    
  //conv.ask("debug");
});

app.intent('capture feeling - no',(conv)=>{
    conv.ask(`<speak>Okay.....But it would be good if you could share</speak>`);
    conv.ask(`<speak>Do you want to open up?</speak>`)
    conv.ask(new Suggestions(`ask me a question`,`goodbye`))
    
});
  
  // Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

