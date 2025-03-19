import Navigo from 'navigo';

/**
 * Router Component
 * @author Joseph Luzquinos
 *
 */
class Router{
    constructor( routes = {} ){
        this.routes  = { ...this.defaultRoutes(), ...routes, ...this.altRoute() };
        this.root    = null;
        this.useHash = true;
        this.hash    = '#';
        this.startRouter();
    }

    defaultRoutes(){
        return {
            'page1': ()=>{
                console.log('Router: This is page1');
            },
            'page2': ()=>{
                console.log('Router: This is page2');
            },
            'page3': ()=>{
                console.log('Router: This is page3');
            }
        }
    }

    altRoute(){
        return {
            '*': ()=>{
                console.log('Router: This is the alt route.');
            }
        }
    }

    startRouter(){
        let router  = new Navigo(this.root, this.useHash, this.hash);
        router.on(this.routes).resolve();
    }
}

export default Router;
