<template>
  <v-container>
    <v-row justify="center">
      <h1 class="display-2 my-6">Questionnaire Origin and Development Appraisal tool</h1>
      <v-col cols="12" sm="11" md="11" lg="10" xl="7">
        {{item_selected}}
        <v-card
          class="my-8"
          v-for="(chapter, i) in qoda"
          :key="i">
          <v-card-title class="headline font-weight-bold">{{chapter.title}}</v-card-title>
          <v-btn v-if="btn_show_select[i]" @click="clearAll(i)" color="primary" class="mx-2">
            <v-icon left medium color="#fff">mdi-close</v-icon>
              Clear All
          </v-btn>
          <v-btn v-else color="primary" @click="selectAll(i)" class="mx-2">
            <v-icon left medium color="#fff">mdi-check</v-icon>
              Select All
          </v-btn>
          <v-list-item
            class="d-flex text-lg-body-1 text-xl-body-1"
            v-for="(item, j) in chapter.content"
            :key="j">
            <v-checkbox v-model="item_selected[i][j]"></v-checkbox>
            <div>{{qoda[i].content[j]}}</div>
          </v-list-item>
        </v-card>
        <v-btn color="primary" class="mx-2" @click="loadImage()">
          Generate PDF
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf'
import Vue from 'vue'
export default {
  name: 'QODA',

  computed: {
    btn_show_select: function(){
        var itemIsTrue = this.itemIsTrue;
        return this.item_selected.map(function(item){
          return item.every(itemIsTrue);
        });
    }
  },

  methods: {
    selectAll(i){
      Vue.set(this.item_selected, i, new Array(this.item_selected[i].length).fill(true));
    },

    clearAll(i){
      Vue.set(this.item_selected, i, new Array(this.item_selected[i].length).fill(false));
    },

    itemIsTrue(value){
      return value;
    },

    loadImage(){
      var checkbox = new Image;
      var checkboxBlank = new Image;
      var imgLoaded = 0;
      var run = this;
      checkbox.onload = function(){
        imgLoaded++;

        if(imgLoaded==2){
          run.generatePDF(checkbox, checkboxBlank);
        }
      };
      checkboxBlank.onload = function(){
        imgLoaded++;
        if(imgLoaded==2){
          run.generatePDF(checkbox, checkboxBlank);
        }
      };

      checkbox.src = 'checkbox.jpg';
      checkboxBlank.src = 'checkbox-blank.jpg';
    },

    generatePDF(checkbox, checkboxBlank){

      var doc = new jsPDF();
      var margin = 15, pageHeight = 295, pageWidth = 210;
      var lineHeight = 8, titleHeight = 4;
      var y = 20;
      var textWidth = pageWidth - 2*margin;

      // Title
      doc.setFontSize(24);
      var text = doc.splitTextToSize(this.title, textWidth);
      doc.text(margin, y, text);
      y += lineHeight*3;

      // Page Number
      doc.setFontType("normal");
      doc.setFont("roboto");
      doc.setFontSize(10);
      doc.text(95, 285, '- 1 -');

      // Step
      for(var i=0; i< this.qoda.length; i++){
        doc.setFontType("bold"); 
        doc.setFont("roboto");
        doc.setFontSize(20);
        text = doc.splitTextToSize(this.qoda[i].title, textWidth);
        for(var j=0; j<text.length; j++){
          doc.text(margin, y, text[j]);
          y += lineHeight;
        }
        y += titleHeight;

        // Content
        doc.setFontType("normal");
        doc.setFontSize(14);
        for(j=0; j<this.qoda[i].content.length; j++){
          

          text = doc.splitTextToSize(this.qoda[i].content[j], textWidth);
          for(var k=0; k<text.length; k++){
            if(y>pageHeight-2*margin){
              y = margin;
              doc.addPage();

              //page number
              doc.setFontSize(10);
              doc.text(95,285, '- 2 -');

              doc.setFontSize(14);
            }
            if(k===0){
              // Draw checkbox
              if(this.item_selected[i][j]){
                doc.addImage(checkbox, 'JPG', margin, y-3.5, 4, 4, 'checkbox');
              }else{
                doc.addImage(checkboxBlank, 'JPG', margin, y-3.5, 4, 4, 'checkboxBlank');
              }
              doc.text(margin + 6, y, text[k]);
            }else{
              doc.text(margin + 8, y, text[k]);
            }
            y += lineHeight;
          }
        }
        y += lineHeight;
      }
      doc.save("QODA Checklist.pdf");
    }
  },

  data: () => ({
    qoda: [
      {
        title: 'Initial development (construct & item specification)',
        content: [
          '1. The definition of the construct(s) measured by the questionnaire is/are appropriate.',
          '2. The target population is appropriate.',
          '3. The purpose of the questionnaire is appropriate.',
          '4. The response scale(s) is/are appropriate.',
          '5. There is coherence between dimensions and the construct.',
          '6. There is coherence between dimensions and items.',
          '7. There is coherence between items and response scale(s).'
        ]
      },
      {
        title: 'Origin (construct & item & function sources)',
        content: [
          '8. Dimensions and items are derived from the input of content experts who are not the intended users of the questionnaire.',
          '9. Dimensions and items are derived from the practical experience of the intended users of the questionnaire.',
          '10. Dimensions and items are derived from other questionnaires relevant to the construct.',
          '11. Dimensions and items are derived from a conceptual framework or theory relevant to the construct.',
          '12. Dimensions and items are derived from empirical studies relevant to the construct.',
          '13. The purpose of the questionnaire is supported by theoretical and/or empirical work(s).'
        ]
      },
      {
        title: 'Origin (methodological quality of studies on origin of construct of items)',
        content: [
          '14. The questionnaire development study was performed in a sample representing the target population.'
        ]
      },
      {
        title: 'Initial development (clarity of construct & items; specification of responses & scales & instructions )',
        content: [
          '15. Information on the questionnaire development phase is provided (Screening Q).',
          '16. The rationale for any modification of dimensions was appropriate.',
          '17. The rationale for any modification of items was appropriate.',
          '18. The rationale for transforming data (such as weighting and standardization) is appropriate.',
          '19. The instructions for administering and scoring the questionnaire are clear and complete.',
          '20. The instructions for completing the questionnaire are clear and complete.'
        ]
      },
    ],
    title : 'Questionnaire Origin and Development Appraisal tool',
    item_selected:[
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false],
      [false, false, false, false, false, false]
    ],
  }),

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
