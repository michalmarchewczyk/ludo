import localization from "./Localization";

class SpeechSynthesis {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = this.synth.getVoices();
        console.log('VOICES', this.voices);
        this.synth.onvoiceschanged = () => {
            this.voices = this.synth.getVoices();
            console.log('VOICES', this.voices);
        };
        this.lang = localization.lang;
    }


    speakValue(value){
        this.lang = localization.lang;
        console.log('SPEAKING');
        let voice = this.voices.find(v => v.lang === this.lang);
        let utterance = new SpeechSynthesisUtterance(localization.translate(value));
        utterance.voice = voice;
        this.synth.speak(utterance);
    }
}

export default SpeechSynthesis;
