#!/bin/base

message=$1
remote=$2
branchName=$3
defaultCommitDir="."

# 坚果云笔记目录
notesDir="${USERPROFILE}\\Nutstore\\1\\我的坚果云\\notes"

# 项目笔记目录
guideDir="D:\\project\\note-sites\\docs"

# 文件不存在则更改目录
if [ ! -d $guideDir ]; then
  guideDir="F:\\project\\note-sites\\docs"
fi

if [ ! -d $guideDir ]; then
  guideDir="E:\\yjb\\note-sites\\docs"
fi

if [ ! -d $guideDir ]; then
  echo 目录 $guideDir 不存在, 请检查
  exit 1
fi

# 排除的文件
ignoreFile=(Other Script)

# 赋默认值, 报错信息不用管
${remote:="origin"} 2> /dev/null 
${branchName:="github-master"} 2> /dev/null
now=$(date "+%Y-%m-%d %H:%M:%S")


# while [ -d $message ]; do
#   read -p "请输入commit message: " message
# done

# 没有 commit 则使用日期信息
if [ -d $message ]; then
  message="${now}【更新】"
fi

# 替换关键字 now 为日期
message=${message/"now()"/"${now}"}

# 彩色输出
function logColorText() {
  case $2 in
    "success")
      echo -e "\033[32m [$0 tip]: $1 \033[0m"
    ;;
    "warning")
      echo -e "\033[33m [$0 tip]: $1 \033[0m"
    ;;
    "danger")
      echo -e "\033[31m [$0 tip]: $1 \033[0m"
    ;;
  esac
}

# 拷贝文件
function syncFile() {
  rm -rf $guideDir\\guide
  cp -frv $notesDir $guideDir
  cd $guideDir\\notes

  for file in ${ignoreFile[@]}; do
    rm -rf $file
  done

  mv $guideDir\\notes $guideDir\\guide
  cd -
}


# 判断上一个命令是否执行成功, 参数1成功提示, 参数2失败提示, 参数3退出码
function isPrevCommand() {
  if [ $? -eq 0 ]; then
    logColorText "$1" "success"
  else
    logColorText "$2" "warning"
    exit $3
  fi
}


# 部署函数
function deploy() {
  start=$(date +%s)

  # --- git
  git add $1
  isPrevCommand "提交暂存区成功" "提交暂存区失败" 1

  git commit -m "$message"
  isPrevCommand "提交成功" "提交失败" 1

  git push $remote $branchName
  isPrevCommand "推送成功" "推送失败" 1

  end=$(date +%s)

  sum=$((end - start))
  logColorText "$0执行成功共用时${sum}s" "success"
  exit 
}


logColorText "开始拷贝文件" "success"
syncFile
isPrevCommand "拷贝文件成功" "拷贝文件失败" 1

deploy $defaultCommitDir
