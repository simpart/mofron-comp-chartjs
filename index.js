/**
 * @file mofron-comp-chartjs/index.js
 * @brief chart.js component for mofron
 * @license MIT
 */
const {Chart} = require("chart.js");
const comutl = mofron.util.common;

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
            this.confmng().add("dataLabels",  { type:"string", list:true });
	    this.confmng().add("dataIndex",  { type:"array" });
	    this.confmng().add("datasets", { type:"array", list:true });
            this.confmng().add("mainColor", { type:"color", list:true });
            this.confmng().add("baseColor", { type:"color", list:true });
            this.confmng().add("borderWidth", { type: "number", init:2 });
            this.confmng().add(
                "options",
                {
                    type:"object",
                    init: {
                        responsive: false,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 1500,
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            }
                        }
                    }
                }
            );
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

    addData (lbl, dat) {
        try {
            this.dataLabels(lbl);
            this.data(dat);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    dataIndex (prm) {
        try {
            return this.confmng('dataIndex', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    dataLabels (prm) {
        try {
	    return this.confmng("dataLabels", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    datasets (prm) {
        try {
            return this.confmng("datasets", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    borderWidth (prm) {
        try {
            return this.confmng("borderWidth", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    options (prm) {
        try {
            let opt = this.confmng("options");
            if (undefined === prm) {
                return opt;
            }
            for (let pidx in prm) {
                opt[pidx] = prm[pidx];
            }
            this.confmng("options", opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    draw() {
        try {
            let chart_data = this.data();
            
            /* check color */
            if (0 === this.mainColor().length) {
                /* init color */
                let clr_lst = this.getColorList();
                for (let cidx=0; cidx < chart_data.length; cidx++) {
                    this.mainColor(clr_lst[cidx]);
                }
            }

            /* check title */
            let plugins = null;
            if (null !== this.title()) {
                plugins = {
                    title: {
                        display: true,
                        text: this.title()
                    }
                };
            }

            /* check plugins */
            if (null !== plugins) {
                let opt = this.options();
                if (undefined === opt.plugins) {
                    opt.plugins = plugins;
                } else {
                    for (let pidx in plugins) {
                        opt.plugins[pidx] = plugins[pidx];
                    }
                }
                this.options(opt);
            }
            
            /* set data */
	    let data_sets  = [];
            for (let didx in chart_data) {
                data_sets.push({
                    label: this.dataLabels()[didx],
                    data:  chart_data[didx],
                    backgroundColor: this.baseColor()[didx],
                    borderColor: this.mainColor()[didx],
                    borderWidth: this.borderWidth()
                });
            }

            // draw chart
            var ChartObj = new Chart(this.rootDom()[0].getRawDom().getContext("2d"), {
                               type: this.type(),
                               data: {
                                   labels: this.dataIndex(),
                                   datasets: data_sets
                               },
                               options: this.options()
                           });
            this.confmng("Chart", ChartObj);
            
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
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

    mainColor (prm) {
        try {
	    if (undefined !== prm) {
                let color = comutl.getcolor(prm);
		let rgb    = color.rgb();
		color.rgba(rgb[0], rgb[1], rgb[2], 0.2);
		this.baseColor(color);
	    }
            return this.confmng("mainColor", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    baseColor (prm) {
        try {
            return this.confmng("baseColor", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    getColorList () {
        try {
            return [
                'rgb(255, 99,  132)',
                'rgb(54,  162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75,  192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(23,  162, 184)',
                'rgb(255, 105, 180)',
                'rgb(34,  177, 76)',
                'rgb(201, 203, 207)'
            ];
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
