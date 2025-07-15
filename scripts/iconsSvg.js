const NS = "http://www.w3.org/2000/svg";
export function SunIcon() {
    const sunIcon = document.createElementNS(NS, 'svg');
    sunIcon.setAttribute('width', '50');
    sunIcon.setAttribute('height', '50');
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '10');
    circle.setAttribute('cx', '25');
    circle.setAttribute('cy', '25');
    circle.setAttribute('stroke', 'yellow');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'none');
    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('points', '22,13 25,10 28,13');
    sunIcon.appendChild(circle);
    sunIcon.appendChild(poly);
    return sunIcon;
}

export function MoonIcon() {
    const moonIcon = document.createElementNS(NS, 'svg');
    moonIcon.setAttribute('width', '50');
    moonIcon.setAttribute('height', '50');
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '10');
    circle.setAttribute('cx', '25');
    circle.setAttribute('cy', '25');
    circle.setAttribute('stroke', 'blue');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'silver');
    moonIcon.appendChild(circle);
    return moonIcon;
}
//15-top circle y
//15-left circle x
//35-right circle x
//35-bottom circlle y