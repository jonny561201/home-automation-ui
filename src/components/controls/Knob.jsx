import React, { useRef, useEffect, useCallback } from 'react';


export default function Knob(props) {
    const canvasRef = useRef(null);
    const touchIndexRef = useRef(0);

    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const step = props.step ?? 1;
    const log = props.log ?? false;
    const w = props.width ?? 200;
    const h = props.height ?? w;
    const thickness = props.thickness ?? 0.35;
    const lineCap = props.lineCap ?? 'butt';
    const bgColor = props.bgColor ?? '#EEE';
    const fgColor = props.fgColor ?? '#EA2';
    const inputColor = props.inputColor ?? '';
    const font = props.font ?? 'Arial';
    const fontWeight = props.fontWeight ?? 'bold';
    const clockwise = props.clockwise ?? true;
    const cursor = props.cursor ?? false;
    const stopper = props.stopper ?? true;
    const readOnly = props.readOnly ?? false;
    const disableTextInput = props.disableTextInput ?? false;
    const displayInput = props.displayInput ?? true;
    const angleArcDeg = props.angleArc ?? 360;
    const angleOffsetDeg = props.angleOffset ?? 0;
    const disableMouseWheel = props.disableMouseWheel ?? false;

    const cursorExt = cursor === true ? 0.3 : cursor / 100;
    const angleArc = angleArcDeg * Math.PI / 180;
    const angleOffset = angleOffsetDeg * Math.PI / 180;
    const startAngle = (1.5 * Math.PI) + angleOffset;
    const endAngle = (1.5 * Math.PI) + angleOffset + angleArc;
    const digits = Math.max(String(Math.abs(min)).length, String(Math.abs(max)).length, 2) + 2;

    const coerceToStep = useCallback((v) => {
        let val = !log
            ? (~~(((v < 0) ? -0.5 : 0.5) + (v / step))) * step
            : Math.pow(step, ~~(((Math.abs(v) < 1) ? -0.5 : 0.5) + (Math.log(v) / Math.log(step))));
        val = Math.max(Math.min(val, max), min);
        if (isNaN(val)) { val = 0; }
        return Math.round(val * 1000) / 1000;
    }, [log, step, max, min]);

    const getArcToValue = (v) => {
        let start;
        let end;
        const angle = !log
            ? ((v - min) * angleArc) / (max - min)
            : Math.log(Math.pow((v / min), angleArc)) / Math.log(max / min);
        if (!clockwise) {
            start = endAngle + 0.00001;
            end = start - angle - 0.00001;
        } else {
            start = startAngle - 0.00001;
            end = start + angle + 0.00001;
        }
        if (cursor) {
            start = end - cursorExt;
            end += cursorExt;
        }
        return { startAngle: start, endAngle: end, acw: !clockwise && !cursor };
    };

    const getCanvasScale = (ctx) => {
        const devicePixelRatio = window.devicePixelRatio ||
            window.screen.deviceXDPI / window.screen.logicalXDPI || 1;
        const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
        return devicePixelRatio / backingStoreRatio;
    };

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const scale = getCanvasScale(ctx);
        canvas.width = w * scale;
        canvas.height = h * scale;
        ctx.scale(scale, scale);
        const xy = w / 2;
        const lineWidth = xy * thickness;
        const radius = xy - (lineWidth / 2);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineCap;
        ctx.beginPath();
        ctx.strokeStyle = bgColor;
        ctx.arc(xy, xy, radius, endAngle - 0.00001, startAngle + 0.00001, true);
        ctx.stroke();
        const a = getArcToValue(props.value);
        ctx.beginPath();
        if (props.fgGradient && props.fgGradient.length >= 2) {
            const gradient = ctx.createLinearGradient(0, xy, w, xy);
            props.fgGradient.forEach((color, i) => {
                gradient.addColorStop(i / (props.fgGradient.length - 1), color);
            });
            ctx.strokeStyle = gradient;
        } else {
            ctx.strokeStyle = fgColor;
        }
        ctx.arc(xy, xy, radius, a.startAngle, a.endAngle, a.acw);
        ctx.stroke();
    }, [w, h, thickness, lineCap, bgColor, fgColor, props.fgGradient, startAngle, endAngle, props.value, min, max, angleArc, log, clockwise, cursor, cursorExt]);

    const eventToValue = useCallback((e) => {
        const bounds = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        let a = Math.atan2(x - (w / 2), (w / 2) - y) - angleOffset;
        if (!clockwise) {
            a = angleArc - a - (2 * Math.PI);
        }
        if (angleArc !== Math.PI * 2 && (a < 0) && (a > -0.5)) {
            a = 0;
        } else if (a < 0) {
            a += Math.PI * 2;
        }
        const val = !log
            ? (a * (max - min) / angleArc) + min
            : Math.pow(max / min, a / angleArc) * min;
        return coerceToStep(val);
    }, [w, angleOffset, clockwise, angleArc, log, max, min, coerceToStep]);

    const handleMouseMove = useCallback((e) => {
        e.preventDefault();
        props.onChange(eventToValue(e));
    }, [eventToValue, props.onChange]);

    const handleMouseUp = useCallback((e) => {
        const onChangeEnd = props.onChangeEnd || (() => {});
        onChangeEnd(eventToValue(e));
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [eventToValue, handleMouseMove, props.onChangeEnd]);

    const handleMouseDown = useCallback((e) => {
        props.onChange(eventToValue(e));
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [eventToValue, handleMouseMove, handleMouseUp, props.onChange]);

    const handleTouchMove = useCallback((e) => {
        e.preventDefault();
        props.onChange(eventToValue(e.targetTouches[touchIndexRef.current]));
    }, [eventToValue, props.onChange]);

    const handleTouchEnd = useCallback((e) => {
        const onChangeEnd = props.onChangeEnd || (() => {});
        onChangeEnd(eventToValue(e));
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
    }, [eventToValue, handleTouchMove, props.onChangeEnd]);

    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        touchIndexRef.current = e.targetTouches.length - 1;
        props.onChange(eventToValue(e.targetTouches[touchIndexRef.current]));
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchEnd);
    }, [eventToValue, handleTouchMove, handleTouchEnd, props.onChange]);

    const handleTextInput = (e) => {
        const val = Math.max(Math.min(+e.target.value, max), min) || min;
        props.onChange(val);
    };

    const handleWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaX > 0 || e.deltaY > 0) {
            props.onChange(coerceToStep(!log ? props.value + step : props.value * step));
        } else if (e.deltaX < 0 || e.deltaY < 0) {
            props.onChange(coerceToStep(!log ? props.value - step : props.value / step));
        }
    }, [coerceToStep, log, step, props.value, props.onChange]);

    const handleArrowKey = (e) => {
        if (e.keyCode === 37 || e.keyCode === 40) {
            e.preventDefault();
            props.onChange(coerceToStep(!log ? props.value - step : props.value / step));
        } else if (e.keyCode === 38 || e.keyCode === 39) {
            e.preventDefault();
            props.onChange(coerceToStep(!log ? props.value + step : props.value * step));
        }
    };

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!readOnly && canvas) {
            canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
            return () => canvas.removeEventListener('touchstart', handleTouchStart);
        }
    }, [readOnly, handleTouchStart]);

    const inputStyle = () => ({
        width: `${((w / 2) + 4) >> 0}px`,
        height: `${(w / 3) >> 0}px`,
        position: 'absolute',
        verticalAlign: 'middle',
        marginTop: `${(w / 3) >> 0}px`,
        marginLeft: `-${((w * 3 / 4) + 2) >> 0}px`,
        border: 0,
        background: 'none',
        font: `${fontWeight} ${(w / digits) >> 0}px ${font}`,
        textAlign: 'center',
        color: inputColor || fgColor,
        padding: '0px',
        WebkitAppearance: 'none',
    });

    const renderCenter = () => {
        if (displayInput) {
            return (
                <input
                    style={inputStyle()}
                    type="text"
                    value={props.value}
                    onChange={handleTextInput}
                    onKeyDown={handleArrowKey}
                    readOnly={readOnly || disableTextInput}
                />
            );
        } else if (props.displayCustom && typeof props.displayCustom === 'function') {
            return props.displayCustom();
        }
        return null;
    };

    return (
        <div
            className={props.className}
            style={{ width: w, height: h, display: 'inline-block', position: 'relative', overflow: 'hidden' }}
            onWheel={readOnly || disableMouseWheel ? null : handleWheel}
        >
            <canvas
                ref={canvasRef}
                className={props.canvasClassName}
                style={{ width: '100%', height: '100%' }}
                onMouseDown={readOnly ? null : handleMouseDown}
                title={props.title ? `${props.title}: ${props.value}` : String(props.value)}
            />
            {renderCenter()}
        </div>
    );
}
