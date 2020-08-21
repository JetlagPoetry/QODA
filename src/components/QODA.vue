<template>
  <v-container>
    <v-row justify="center" >
      <h1 class="display-2 my-6 text-center" >{{$t('home.title')}}</h1>
      <v-col cols="12" sm="11" md="11" lg="10" xl="7">
        <div class="title">
          {{$t('tool.title_intro')}}
        </div>
        <div>
          {{$t('tool.introduction')}}
        </div>
        <div class="title mt-6">
          {{$t('tool.title_instr')}}
        </div>
        <ul>
          <li 
            v-for="(step, i) in $t('tool.instructions')"
            :key="i">{{$t('tool.instructions['+i+']')}}</li>
        </ul>
        <v-card
          class="my-8"
          v-for="(chapter, i) in $t('qoda')"
          :key="i">
          <v-card-title class="headline font-weight-bold">{{chapter.title}}</v-card-title>
          <v-btn v-if="btn_show_select[i]" @click="clearAll(i)" color="primary" class="mx-4 mb-4">
            <v-icon left medium color="#fff">mdi-close</v-icon>
              Clear All
          </v-btn>
          <v-btn v-else color="primary" @click="selectAll(i)" class="mx-4 mb-4">
            <v-icon left medium color="#fff">mdi-check</v-icon>
              Select All
          </v-btn>
          <v-list-item
            class="py-2 py-lg-0 d-flex text-lg-body-1"
            v-for="(item, j) in chapter.content"
            :key="j">
            <v-checkbox v-model="item_selected[i][j]"></v-checkbox>
            <div>{{$t('qoda['+i+'].content['+j+']')}}</div>
          </v-list-item>
        </v-card>
        <v-btn color="secondary" class="mx-2" @click="loadImage()">
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
      // width control(largest->smallest): pageWidth->margin->(tableLine&header)->tablePadding->(titleWidth)->checkboxIndentation->(textWidth)
      var doc = new jsPDF();
      var margin = 20,  pageWidth = 210;
      var lineHeight = 5, titleMarginBefore = 3, titleMarginAfter = 1, checkboxIndentation = 10, tablePadding = 5;
      var y = 20;
      var textWidth = pageWidth - 2*margin - tablePadding*2 - checkboxIndentation, titleWidth = pageWidth - 2*margin - tablePadding*2;
      var header1 = "Achieved", header2 = "Item";
      var textSize = 12, titleSize = 18, headerSize = 10;

      // Title
      doc.setFont("roboto");
      doc.setFontSize(titleSize);
      var text;
      doc.text(this.$t('home.title'), pageWidth/2, y, null, null, 'center'); // calls with 'center' takes the x parameter as the aiming position for centering instead of the start.
      y += lineHeight*2;

      // Header
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth-margin, y);
      y += lineHeight;
      
      doc.setFontSize(headerSize);
      doc.text(margin, y, header1);
      doc.text(margin + tablePadding + checkboxIndentation, y, header2);
      y += 2;
      doc.line(margin, y, pageWidth - margin, y);
      y += lineHeight;

      // Step
      doc.setFontSize(textSize);
      for(var i=0; i< this.$t('qoda').length; i++){
        doc.setFontType("bold");
        text = doc.splitTextToSize(this.$t('qoda['+i+'].title'), titleWidth);
        for(var j=0; j<text.length; j++){
          doc.text(margin+tablePadding, y, text[j]);
          y += lineHeight;
        }
        y += titleMarginAfter;

        // Content
        doc.setFontType("normal");
        for(j=0; j<this.$t('qoda['+i+'].content.length'); j++){
          
          text = doc.splitTextToSize(this.$t('qoda['+i+'].content['+j+']'), textWidth);
          for(var k=0; k<text.length; k++){
            if(k===0){
              // Draw checkbox
              if(this.item_selected[i][j]){
                doc.addImage(checkbox, 'JPG', margin+tablePadding, y-3.5, 4, 4, 'checkbox');
              }else{
                doc.addImage(checkboxBlank, 'JPG', margin+tablePadding, y-3.5, 4, 4, 'checkboxBlank');
              }
            }
            doc.text(margin + checkboxIndentation + tablePadding, y, text[k]);
            y += lineHeight;
          }
        }
        y += titleMarginBefore;
      }
      y = y - titleMarginBefore - lineHeight + titleMarginAfter*2;
      doc.line(margin, y, pageWidth - margin, y);
      doc.save("QODA Checklist.pdf");
    }
  },

  data: () => ({
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
*{
    font-family: Verdana, "Lucida Grande", sans-serif
}
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
