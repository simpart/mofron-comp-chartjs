/**
 * @file mofron-comp-chartjs/index.js
 * @brief chart.js component for mofron
 * @license MIT
 */
module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("ChartJS");
	    this.shortForm("type");
            
	    /* init config */
	    this.confmng().add("title", { type:"string" });
            this.confmng().add("type",  { type:"string" });
	    this.confmng().add("data",  { type:"array", list:true });
            this.confmng().add("Chart", { type: "object" });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts('canvas');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    title (prm) {
        try {
            return this.confmng("title", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    type (prm) {
        try {
            return this.confmng("type", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    data (prm) {
        try {
            return this.confmng("data", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    draw() {
        // this is interface
    }

    width (prm) {
        try {
            if (undefined === prm) {
                return this.rootDom()[0].attrs('width');
            }
            this.rootDom()[0].attrs({ width:prm });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    height (prm) {
        try {
            if (undefined === prm) {
                return this.rootDom()[0].attrs('height');
            }
            this.rootDom()[0].attrs({ height:prm });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    getChart () {
        try {
            return this.confmng("Chart");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
