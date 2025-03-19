/**
 * ChangeBackgroundColor
 * @author: Joseph Luzquinos
 * @argument:
 */
export default class ChangeBackgroundColor{
    constructor(){
        this.w = window;
        this.d = document;
        this.mobileBreakpoint = 760;
        this.init();
    }

    init(){
    	//On load
    	if(this.w.innerWidth >= this.mobileBreakpoint){
    		this.changeBGColor();
    	}

    	//On Resize
		this.w.addEventListener('resize', this.debounce( function(){
			if(this.w.innerWidth >= this.mobileBreakpoint){
				return this.changeBGColor();
			}
		} ) );
    }

    debounce(func, wait = 500, immediate = false){
		var timeout;
		return () => {
		    const context = this, args = arguments;
		    const later = function() {
		        timeout = null;
		        if (!immediate) func.apply(context, args);
		    };
		    const callNow = immediate && !timeout;
		    clearTimeout(timeout);
		    timeout = setTimeout(later, wait);
		    if (callNow) func.apply(context, args);
		};
	};

    changeBGColor(){
    	this.d.querySelector('.sec-7_bg-1')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

				if(this.w.innerWidth >= this.mobileBreakpoint){
					$('#section7')
						.removeClass('section7-bg2')
						.removeClass('section7-bg3')
						.removeClass('section7-bg4')
						.removeClass('section7-bg5')
						.removeClass('section7-bg6')
						.addClass('section7-bg1');
				}
			});

		this.d.querySelector('.sec-7_bg-2')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

				if(this.w.innerWidth >= this.mobileBreakpoint){
					$('#section7')
					.removeClass('section7-bg1')
					.removeClass('section7-bg3')
					.removeClass('section7-bg4')
					.removeClass('section7-bg5')
					.removeClass('section7-bg6')
					.addClass('section7-bg2');
				}

			});

		this.d.querySelector('.sec-7_bg-3')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

			if(this.w.innerWidth >= this.mobileBreakpoint){
				$('#section7')
				.removeClass('section7-bg1')
				.removeClass('section7-bg2')
				.removeClass('section7-bg4')
				.removeClass('section7-bg5')
				.removeClass('section7-bg6')
				.addClass('section7-bg3');		
			}
		}); 

		this.d.querySelector('.sec-7_bg-4')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

			if(this.w.innerWidth >= this.mobileBreakpoint){
				$('#section7')
					.removeClass('section7-bg1')
					.removeClass('section7-bg2')
					.removeClass('section7-bg3')
					.removeClass('section7-bg5')
					.removeClass('section7-bg6')
					.addClass('section7-bg4');		
			}
		}); 

		this.d.querySelector('.sec-7_bg-5')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

			if(this.w.innerWidth >= this.mobileBreakpoint){
				$('#section7')
					.removeClass('section7-bg1')
					.removeClass('section7-bg2')
					.removeClass('section7-bg3')
					.removeClass('section7-bg4')
					.removeClass('section7-bg6')
					.addClass('section7-bg5');	
			}				
		});

		this.d.querySelector('.sec-7_bg-6')
			.addEventListener('mouseenter',(e)=>{
				e.preventDefault();

			if(this.w.innerWidth >= this.mobileBreakpoint){
				$('#section7')
					.removeClass('section7-bg1')
					.removeClass('section7-bg2')
					.removeClass('section7-bg3')
					.removeClass('section7-bg4')
					.removeClass('section7-bg5')
					.addClass('section7-bg6');
			}
		});
    }
}