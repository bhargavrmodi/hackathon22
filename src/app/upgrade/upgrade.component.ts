import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  myarray: String[] = [];
  i: number = 0;
  
  quizlist = [
    {
      ID: 1, language: "java", question: "Inventor of c++?", anslistobj: ["Pavan.c", "James Gosling", "Richie Richie", "Amos.Emmanual"], answer: "Richie Richie"
    },
    {
      ID: 2, language: "java", question: "Inventor of java?", anslistobj: ["Nayan.c", "Ärmesh", "Denish Richie", "Kiran.DY"], answer: "Denish Richie"
    },
    {
      ID: 3, language: "java", question: "how is java?", anslistobj: ["Easy", "Difficult", "moderate", "nonoe"], answer: "Easy"
    },
    {
      ID: 4, language: "cprogram", question: "Inventor of cprogram?", anslistobj: ["a", "b", "c", "d"], answer: "a"
    },
    {
      ID: 5, language: "cprogram", question: "Inventor of C?", anslistobj: ["a", "b", "c", "d"], answer: "b"
    }
  ];

quizlength: number = this.quizlist.length;
question: String = this.quizlist[this.i].question;
selectedvalue: String;
option: any[] = this.quizlist[this.i].anslistobj;

ngOnInit() {

}

  next() {   
    ++this.i;
    this.question = this.quizlist[this.i].question;
    this.option = this.quizlist[this.i].anslistobj;
  }
  previous() {
    --this.i;
    this.question = this.quizlist[this.i].question;
    this.option = this.quizlist[this.i].anslistobj;
  }

  answerkey = [];

  check(e, answer: String) {
    if (e.target.checked) {
      this.answerkey.push(e, answer);
    }
    else {
      this.answerkey.splice(0, 1);
    }
    this.recursivecheck();
  }

  marks: number = 0;
  generatemark() {
    for (var i = 0; i < this.answerkey.length; i++) {
      if (this.answerkey[i].choosen == this.quizlist[i].answer) this.marks++;
    }
    // alert("your score is "+JSON.stringify(this.marks));
    document.writeln("your score is " + this.marks);
  }


  recursivecheck() {
    var result1 = this.quizlist;
    var result2 = this.answerkey;

    var props = ['id', 'answer'];

    var result = result1.filter(function (o1) {
      // filter out (!) items in result2
      return result2.some(function (o2) {
        return o1.answer === o2.answer;
        // assumes unique id
      });

    }).map(function (o) {

      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce(function (newo, ans) {
        newo[ans] = o[ans];
        return newo;
      }, {});
    });
    console.log("result:" + JSON.stringify(result));
  }


}
