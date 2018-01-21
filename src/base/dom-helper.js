export class DomHelper {
  static contains(parent, target) {
    if (parent === target)
      return true;
    if (parent.children.length > 0) {
      for (let child of parent.children) {
        let r = DomHelper.contains(child, target);
        if (r) return true;
      }
    }
    return false;
  }
}