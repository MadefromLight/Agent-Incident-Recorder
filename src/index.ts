export type Severity="low"|"medium"|"high"|"critical";
export interface Event {id:string;at:string;type:string;actor?:string;data?:Record<string,unknown>;causedBy?:string;}
export interface Incident {id:string;title:string;severity:Severity;status:"open"|"investigating"|"resolved";events:Event[];}
export function timeline(incident:Incident):Event[]{return [...incident.events].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));}
export function addEvent(incident:Incident,event:Event):Incident{return {...incident,events:[...incident.events,event]};}
export function rootEvents(incident:Incident):Event[]{const childIds=new Set(incident.events.map(e=>e.causedBy).filter((x):x is string=>Boolean(x)));return incident.events.filter(e=>!childIds.has(e.id));}
