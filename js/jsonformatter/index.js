"use strict";

const onClickFormatJson = function () {
  const beforeJson = Array.from(document.getElementById("before").value.replace(/\s+/g, ""));
  let result = "";

  let indentLevel = 0;
  let arrayLevel = 0;
  let strMode = "none";
  let numberMode = "none";
  let mode = "none";
  let isObject = false;
  const space = "  ";

  if(beforeJson[0] === "{") {
    isObject = true;
    indentLevel++;
    result += "{";
  } else {
    isObject = false;
    indentLevel++;
    arrayLevel++;
    mode = "arrayStart";
    result += "[";
  }

  let beforeJsonSize = beforeJson.length - 1;
  for(let i = 1; i < beforeJsonSize; i++) {
    switch(beforeJson[i]) {
      //Object : start
      case "{":
        if(strMode === "strStart") {
          result += "{";
        } else if(beforeJson[i - 1] === ":") {
          result += " {";
          indentLevel++;
        } else if(mode === "arrayStart"){
          result += "\n" + space.repeat(indentLevel) + "{";
          indentLevel++;
        } else {
          result += "{";
          indentLevel++;
        }
        break;
      //Object : end
      case "}":
        if(strMode === "strStart") {
          result += "}";
        } else {
          indentLevel--;
          result += "\n" + space.repeat(indentLevel) + "}";
        }
        break;
      //Array : start
      case "[":
        if(strMode === "strStart") {
          result += "[";
        } else {
          if(beforeJson[i - 1] === ":") {
            result += " [";
          } else if(mode === "arrayStart") {
            result += "\n" + space.repeat(indentLevel) + "[";
          } else {
            result += "[";
          }
          mode = "arrayStart";
          indentLevel++;
          arrayLevel++;
        }
        break;
      //Array : end
      case "]":
        console.log(arrayLevel);
        indentLevel--;
        arrayLevel--;
        result += "\n" + space.repeat(indentLevel) + "]";
        if(arrayLevel <= 0) {
          mode = "arrayEnd";
        }
        break;
      //String
      case "\"":
        if(strMode === "strStart") {
          result += "\"";
          if(beforeJson[i + 1] === "," || beforeJson[i + 1] === ":" || beforeJson[i + 1] === "}" || beforeJson[i + 1] === "]") {
            strMode = "strEnd";
            console.log(beforeJson[i - 1]);
          }
        } else {
          if(beforeJson[i - 1] === ":") {
            result += " " + beforeJson[i];
          } else {
            //console.log("" + i + ":" + beforeJson[i + 1]);
            result += "\n" + space.repeat(indentLevel) + beforeJson[i];
          }
          strMode = "strStart";
        }
        break;
      //Boolean : true
      case "t":
        if(strMode !== "strStart") {
          if(beforeJson[i + 1] === "r") {
            if(mode === "arrayStart") {
              result += "\n" + space.repeat(indentLevel) + "t";
            } else {
              result += " t";
            }
          }
        } else {
          result += "t";
        }
        break;
      //Boolean : false
      case "f":
        if(strMode !== "strStart") {
          if(beforeJson[i + 1] === "a") {
            if(mode === "arrayStart") {
              result += "\n" + space.repeat(indentLevel) + "f";
            } else {
              result += " f";
            }
          }
        } else {
          result += "f";
        }
        break;
      case "n":
        if(strMode !== "strStart") {
          if(beforeJson[i + 1] === "u") {
            if(mode === "arrayStart") {
              result += "\n" + space.repeat(indentLevel) + "n";
            } else {
              result += " n";
            }
          }
        } else {
          result += "n"
        }
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "-":
        if(strMode !== "strStart") {
          if(numberMode === "numberStart") {
            result += beforeJson[i];
          } else {
            if(mode === "arrayStart" && beforeJson[i - 1] !== ":") {
              result += "\n" + space.repeat(indentLevel) + beforeJson[i];
            } else {
              result += " " + beforeJson[i];
            }
            numberMode = "numberStart";
          }
        } else {
          result += beforeJson[i];
        }
        break;
      case ",":
        if(numberMode === "numberStart") {
          result += ",";
          numberMode = "numberEnd";
        } else {
          result += ",";
        }
        break;
      default:
        result += beforeJson[i];
        break;
    }
    //result += beforeJson[i];
  }

  result += isObject ? "\n}" : "\n]";

  document.getElementById("after").value = result;
}