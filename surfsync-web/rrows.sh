SP="C:/Users/rishu/AppData/Local/Temp/claude/c--Users-rishu-my-website/d133d0d3-26ea-45c1-9fa3-4de1054b878b/scratchpad"
bash $SP/rs/run.sh
python - <<PY
from PIL import Image
import numpy as np
A=np.asarray(Image.open("$SP/rs/live.png").convert('RGB')).astype(int);D=np.asarray(Image.open("$SP/rs/design.png").convert('RGB')).astype(int)
def bb(img,x0,y0,x1,y1):
    r=img[y0:y1,x0:x1];m=r.min(axis=2)<200;ys,xs=np.nonzero(m);return xs.min()+x0,xs.max()+x0,ys.min()+y0,ys.max()+y0
def rows(img,y0,y1,x0=100,x1=700):
    r=img[y0:y1,x0:x1];m=(r.min(axis=2)<200).any(axis=1);out=[];s=None
    for i,v in enumerate(m):
        if v and s is None:s=i
        if not v and s is not None:
            if i-s>3:out.append((s+y0,i+y0))
            s=None
    return out
print(bb(D,600,100,1440,670),bb(A,600,100,1440,670))
print('D',rows(D,100,3200));print('L',rows(A,100,3200))
PY
