const FlapState = {
  NOFLAP: 'no flap',
  WINGSUP: 'wings up',
  WINGSDOWN: 'wings down',
}

class ArmFlap {

  constructor(bird) {
    this.yTopFlapThreshold = height * 0.4;
    this.yBottomFlapThreshold = height - height * 0.3;
    this.human = null;
    this.flapState = FlapState.NOFLAP;
    
    this.topFlapArea = color(0, 0, 255, 50);
    this.bottomFlapArea = this.topFlapArea;
    this.wingInFlapAreaColor = color(255, 0, 255, 50);
    this.bird = bird;
    this.bird.flapStrength = 30;
    this.bird.gravity = 0.7;
  }

  update(human) {
    console.log("Y top: " ,this.yTopFlapThreshold);
    console.log("Y Botton: ",this.yBottomFlapThreshold)
    this.human = human;
    
    if(this.areWingsUp()){
      
      this.flapState = FlapState.WINGSUP;

    }else if(this.flapState == FlapState.WINGSUP && 
            (this.areWingsDown())){
      print("Wing flap registered...");
      
      this.bird.flap();
      
      this.flapState = FlapState.WINGSDOWN;
    }else if(this.flapState == FlapState.WINGSDOWN){
      this.flapState = FlapState.NOFLAP; 
    }
  }
  
  areWingsUp(){
    if(this.human){

        console.log("Nose",human.pose.nose.y)

       //return p.nose.y < this.yBottomFlapThreshold
      
      return this.human.pose.leftWrist.y < this.yTopFlapThreshold &&
       this.human.pose.rightWrist.y < this.yTopFlapThreshold;
      
    }
    return false;
  }
  
  areWingsDown(){
    if(this.human){
      
      console.log("Nose",human.pose.nose.y)

      //return p.nose.y > this.yBottomFlapThreshold
      return this.human.pose.leftWrist.y > this.yBottomFlapThreshold &&
      this.human.pose.rightWrist.y > this.yBottomFlapThreshold; 
      
    }
    return false;
  }

  draw() {


    push();
    //noFill();
    noStroke();
    if(this.areWingsUp()){

      


      fill(this.wingInFlapAreaColor); 
    }else{
      fill(this.topFlapArea);
    }
    rect(0, 0, width, this.yTopFlapThreshold);
    
    if(this.areWingsDown()){
      fill(this.wingInFlapAreaColor); 
    }else{
      fill(this.bottomFlapArea); 
    }
    rect(0, this.yBottomFlapThreshold, width, height - this.yBottomFlapThreshold);
    pop();
  }

}


/*
p = human.pose
let eyeR = p.rightEye;
let eyeL = p.leftEye;
let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
fill(255, 0, 0);
ellipse(p.nose.x, p.nose.y, 40);

*/