class SpeechSynthesis {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = this.synth.getVoices();
        console.log('VOICES', this.voices);
        this.synth.onvoiceschanged = () => {
            this.voices = this.synth.getVoices();
            console.log('VOICES', this.voices);
        };
        this.lang = "pl-PL";
    }


    speakValue(value){
        console.log('SPEAKING');
        let voice = this.voices.find(v => v.lang === this.lang);
        let texts = {
            '1': 'jeden',
            '2': 'dwa',
            '3': 'trzy',
            '4': 'cztery',
            '5': 'pięć',
            '6': 'sześć'
        }
        let utterance = new SpeechSynthesisUtterance(texts[value]);
        utterance.voice = voice;
        this.synth.speak(utterance);
    }
}

export default SpeechSynthesis;
