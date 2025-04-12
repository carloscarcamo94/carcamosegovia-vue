export default {
  name: 'App',
  data() {
    return {
      result: '',
      calculated: false
      // Flag to track if calculation has been done
    };
  },
  methods: {
    handleClick(value) {
      if (this.calculated) {
        // If calculation has been done, 
        // start a new expression
        this.result = value;
        this.calculated = false; // Reset flag
      } else {
        this.result += value;
      }
    },
    handleClear() {
      this.result = '';
      this.calculated = false; // Reset flag
    },
    handleClearEntry() {
      if (this.result && this.result.length > 0) {
        this.result = this.result.slice(0, -1);
        if (this.result.length === 0) {
          this.handleClear();
        }
      } else {
        this.handleClear();
      }
    },
    handleOperatorClick(operator) {
      // If the last character is an operator, 
      // replace it with the new operator
      if (/[+*/-]$/.test(this.result)) {
        this.result = this.result.slice(0, -1) + operator;
      } else {
        // Otherwise, add the new operator
        this.result += operator;
      }
      this.calculated = false; // Reset flag
    },
    calculate() {
      try {
        let evaluatedResult = eval(this.result.replace(/(^|[^0-9])0+(\d+)/g, '$1$2'));
        if (evaluatedResult === Infinity || evaluatedResult === -Infinity) {
          throw new Error('Division por cero');
        }
        this.result = Number.isFinite(evaluatedResult) ? evaluatedResult : 'Error';
        this.calculated = true;
        // Set flag to true after calculation
      } catch (error) {
        if (error.message === 'Division por cero') {
          this.result = 'Error: División por cero';
        } else {
          this.result = 'Error';
        }
      }
    }
  }
};
